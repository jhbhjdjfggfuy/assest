import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Property } from '../types/database';

export default async function PropertiesPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: properties } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'available')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-heading text-primary">Available Properties</h1>
          <Link
            href="/properties/new"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
          >
            List Property
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties?.map((property: Property) => (
            <Link href={`/properties/${property.id}`} key={property.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h2 className="text-xl font-heading text-primary mb-2">{property.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500 capitalize">
                      {property.category}
                    </span>
                    <span className="text-lg font-semibold text-primary">
                      ${property.estimated_value.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {(!properties || properties.length === 0) && (
            <div className="col-span-full text-center text-gray-500">
              No properties available at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}