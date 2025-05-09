'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiCheck, FiX, FiLoader } from 'react-icons/fi';

interface TradeActionsProps {
  offerId: string;
  propertyTitle: string;
  offerAmount?: number;
}

export default function TradeActions({ offerId, propertyTitle, offerAmount }: TradeActionsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [actionType, setActionType] = useState<'accepted' | 'rejected' | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleAction = async (action: 'accepted' | 'rejected') => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('trade_offers')
        .update({ 
          status: action,
          processed_at: new Date().toISOString()
        })
        .eq('id', offerId);

      if (error) throw error;

      toast.success(
        action === 'accepted' 
          ? 'Trade offer accepted successfully!' 
          : 'Trade offer declined successfully!',
        { duration: 3000 }
      );

      // Send notification to the other party
      await supabase.from('notifications').insert({
        user_id: action === 'accepted' ? 'proposer_id' : 'receiver_id',
        type: 'trade_offer_' + action,
        message: `Your trade offer for ${propertyTitle} has been ${action}`,
        offer_id: offerId
      });

      router.refresh();
    } catch (error: any) {
      setError(error.message);
      toast.error('Failed to process trade offer');
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const handleConfirmClick = (action: 'accepted' | 'rejected') => {
    setActionType(action);
    setShowConfirm(true);
  };

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm flex items-center">
        <FiX className="w-4 h-4 mr-2" />
        {error}
      </div>
    );
  }

  if (showConfirm) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700 mb-4">
          Are you sure you want to {actionType === 'accepted' ? 'accept' : 'decline'} this trade offer
          {offerAmount ? ` worth $${offerAmount.toLocaleString()}` : ''}?
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => handleAction(actionType!)}
            disabled={loading}
            className={`flex items-center justify-center px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${
              actionType === 'accepted'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            } disabled:opacity-50`}
          >
            {loading ? (
              <FiLoader className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <FiCheck className="w-4 h-4 mr-2" />
                Confirm
              </>
            )}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex space-x-3">
      <button
        onClick={() => handleConfirmClick('accepted')}
        disabled={loading}
        className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors disabled:opacity-50"
      >
        <FiCheck className="w-4 h-4 mr-2" />
        Accept
      </button>
      <button
        onClick={() => handleConfirmClick('rejected')}
        disabled={loading}
        className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors disabled:opacity-50"
      >
        <FiX className="w-4 h-4 mr-2" />
        Decline
      </button>
    </div>
  );
}