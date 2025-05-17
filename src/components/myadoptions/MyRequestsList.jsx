import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, Info, ArrowRight } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

const MyRequestsList = ({ requests }) => {
  if (requests.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No adoption requests yet</h3>
        <p className="text-gray-600 mb-6">
          You haven't submitted any adoption requests.
        </p>
        <Button asChild>
          <Link to="/pets">Browse Pets</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {requests.map(request => (
        <Card key={request.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-4 gap-0 md:gap-4 items-center">
              <div className="md:col-span-1 h-48 md:h-full">
                {request.pet?.imageUrl ? (
                  <img 
                    src={request.pet.imageUrl} 
                    alt={request.pet.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Info className="h-10 w-10 text-gray-400"/>
                  </div>
                )}
              </div>
              <div className="p-6 md:col-span-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                  <div>
                    <h3 className="text-2xl font-semibold text-primary">
                      {request.pet ? request.pet.name : 'Unknown Pet'}
                    </h3>
                    <p className="text-gray-600">
                      {request.pet ? `${request.pet.breed} • ${request.pet.age} years old` : 'Details unavailable'}
                    </p>
                  </div>
                  <Badge className={`${statusColors[request.status] || 'bg-gray-100 text-gray-800'} mt-2 sm:mt-0`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500">
                    Submitted on: {formatDate(request.createdAt)}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  {request.status === 'pending' && (
                    <p className="flex items-center text-yellow-600 font-medium">
                      <Clock className="h-4 w-4 mr-2" />
                      Waiting for response
                    </p>
                  )}
                  {request.status === 'approved' && (
                    <p className="flex items-center text-green-600 font-medium">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Adoption approved! Congratulations!
                    </p>
                  )}
                  {request.status === 'rejected' && (
                     <p className="flex items-center text-red-600 font-medium">
                      <XCircle className="h-4 w-4 mr-2" />
                      Adoption request declined
                    </p>
                  )}
                  
                  {request.pet && (
                    <Button asChild variant="outline" size="sm" className="mt-3 sm:mt-0">
                      <Link to={`/pets/${request.pet.id}`}>
                        View Pet
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyRequestsList;