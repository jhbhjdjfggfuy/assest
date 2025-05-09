import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import TradeForm from './trade-form';
import { Property } from '@/app/types/database';

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: property } = await supabase
    .from('properties')
    .select(`
      *,
      user:auth.users!properties_user_id_fkey(email)
    `)
    .eq('id', params.id)
    .single();

  if (!property) {
    notFound();
  }

  const { data: { session } } = await supabase.auth.getSession();
  const { data: userProperties } = await supabase
    .from('properties')
    .select('*')
    .eq('user_id', session?.user.id)
    .eq('status', 'available');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/properties" className="text-primary hover:text-primary/80">
            ← Back to Properties
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-heading text-primary mb-4">{property.title}</h1>
            <p className="text-gray-600 mb-6">{property.description}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-heading text-primary mb-4">Property Details</h2>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Category</dt>
                    <dd className="text-sm text-gray-900 capitalize">{property.category}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Estimated Value</dt>
                    <dd className="text-sm text-gray-900">${property.estimated_value.toLocaleString()}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="text-sm text-gray-900 capitalize">{property.status}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Listed By</dt>
                    <dd className="text-sm text-gray-900">{property.user?.email}</dd>
                  </div>
                </dl>
              </div>

              {session && property.user_id !== session.user.id && property.status === 'available' && (
                <div>
                  <h2 className="text-xl font-heading text-primary mb-4">Propose a Trade</h2>
                  <TradeForm 
                    receiverPropertyId={property.id} 
                    userProperties={userProperties as Property[]} 
                  />
                </div>
              )}

              {session && property.user_id === session.user.id && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-600">This is your property listing.</p>
                </div>
              )}

              {!session && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-600">
                    Please{' '}
                    <Link href="/auth/login" className="text-primary hover:text-primary/80">
                      sign in
                    </Link>
                    {' '}to propose a trade.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}