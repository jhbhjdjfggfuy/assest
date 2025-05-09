import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PropertyForm from './property-form';

export default async function NewPropertyPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-heading text-primary mb-8">List Your Property</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <PropertyForm />
        </div>
      </div>
    </div>
  );
}