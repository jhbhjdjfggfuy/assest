import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Property, TradeOffer } from '../types/database';
import TradeActions from './trade-actions';
import { FiPlus, FiHome, FiRefreshCw, FiArrowRight, FiDollarSign, FiPackage } from 'react-icons/fi';
import Image from 'next/image';

export default async function DashboardPage() {
  // ... existing code ...

  // Get statistics
  const totalPropertyValue = properties?.reduce((sum, prop) => sum + prop.estimated_value, 0) || 0;
  const pendingOffersCount = receivedOffers?.length || 0;
  const activeListingsCount = properties?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
              <p className="mt-1 text-gray-600">Manage your properties and trade offers</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                href="/properties/new"
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
              >
                <FiPlus className="w-5 h-5 mr-2" />
                List New Property
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FiDollarSign className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Portfolio Value</p>
                <p className="text-2xl font-bold text-gray-900">${totalPropertyValue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FiRefreshCw className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Offers</p>
                <p className="text-2xl font-bold text-gray-900">{pendingOffersCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FiHome className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900">{activeListingsCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* My Properties */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Properties</h2>
              <Link
                href="/properties"
                className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
              >
                View All
                <FiArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {properties?.map((property: Property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={property.image_url || '/placeholder-property.jpg'}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <FiPackage className="w-4 h-4 mr-1" />
                        <span className="capitalize">{property.category}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">
                          ${property.estimated_value.toLocaleString()}
                        </span>
                        <Link
                          href={`/properties/${property.id}`}
                          className="text-primary hover:text-primary/80 font-medium text-sm flex items-center"
                        >
                          View Details
                          <FiArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {properties?.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <FiHome className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No properties listed yet.</p>
                  <Link
                    href="/properties/new"
                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <FiPlus className="w-5 h-5 mr-2" />
                    List Your First Property
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Trade Offers */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Trade Offers</h2>
            
            {/* Received Offers */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Received Offers</h3>
              <div className="space-y-4">
                {receivedOffers?.map((offer: any) => (
                  <div key={offer.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-gray-900">
                        Offering: {offer.proposer_property.title}
                      </p>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                        Pending
                      </span>
                    </div>
                    {offer.additional_cash > 0 && (
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <FiDollarSign className="w-4 h-4 mr-1" />
                        Additional cash: ${offer.additional_cash.toLocaleString()}
                      </div>
                    )}
                    <div className="mt-4">
                      <TradeActions offerId={offer.id} />
                    </div>
                  </div>
                ))}
                {receivedOffers?.length === 0 && (
                  <p className="text-gray-600 text-center py-4">No pending offers received.</p>
                )}
              </div>
            </div>

            {/* Sent Offers */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sent Offers</h3>
              <div className="space-y-4">
                {sentOffers?.map((offer: any) => (
                  <div key={offer.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-gray-900">
                        For: {offer.receiver_property.title}
                      </p>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        offer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        offer.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {offer.status}
                      </span>
                    </div>
                    {offer.additional_cash > 0 && (
                      <div className="flex items-center text-sm text-gray-600">
                        <FiDollarSign className="w-4 h-4 mr-1" />
                        Additional cash: ${offer.additional_cash.toLocaleString()}
                      </div>
                    )}
                  </div>
                ))}
                {sentOffers?.length === 0 && (
                  <p className="text-gray-600 text-center py-4">No offers sent yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}