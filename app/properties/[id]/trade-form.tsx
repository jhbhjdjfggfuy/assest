'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Property } from '@/app/types/database';

const tradeSchema = z.object({
  proposer_property_id: z.string().min(1, 'Please select a property to trade'),
  additional_cash: z.string().transform((val) => (val ? Number(val) : 0)),
});

type TradeFormData = z.infer<typeof tradeSchema>;

interface TradeFormProps {
  receiverPropertyId: string;
  userProperties: Property[];
}

export default function TradeForm({ receiverPropertyId, userProperties }: TradeFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TradeFormData>({
    resolver: zodResolver(tradeSchema),
  });

  const onSubmit = async (data: TradeFormData) => {
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase.from('trade_offers').insert({
        proposer_id: user.id,
        receiver_property_id: receiverPropertyId,
        proposer_property_id: data.proposer_property_id,
        additional_cash: data.additional_cash,
      });

      if (error) throw error;

      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (userProperties.length === 0) {
    return (
      <div className="text-gray-600">
        You need to list a property first before you can make a trade offer.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="proposer_property_id" className="block text-sm font-medium text-gray-700">
          Select Your Property
        </label>
        <select
          id="proposer_property_id"
          {...register('proposer_property_id')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="">Select a property</option>
          {userProperties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.title} (${property.estimated_value.toLocaleString()})
            </option>
          ))}
        </select>
        {errors.proposer_property_id && (
          <p className="mt-1 text-sm text-red-500">{errors.proposer_property_id.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="additional_cash" className="block text-sm font-medium text-gray-700">
          Additional Cash Offer ($)
        </label>
        <input
          type="number"
          id="additional_cash"
          {...register('additional_cash')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          placeholder="0"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {loading ? 'Submitting...' : 'Submit Trade Offer'}
        </button>
      </div>
    </form>
  );
}