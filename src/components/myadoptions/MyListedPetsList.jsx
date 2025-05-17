import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, Info, ArrowRight, Users, MessageSquare } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
};

const petStatusColors = {
    available: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    adopted: 'bg-blue-100 text-blue-800'
};

const requestStatusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

const ApplicantRequestCard = ({ request, onUpdateRequest }) => (
  <div className="border rounded-lg p-4 bg-white shadow-sm">
    <div className="flex justify-between items-start mb-2">
      <div>
        <h5 className="font-semibold text-primary">{request.applicantInfo.applicantName || 'Applicant'}</h5>
        <p className="text-sm text-gray-600">
          {request.applicantInfo.applicantEmail || request.applicantInfo.email}
        </p>
        <p className="text-xs text-gray-500">Applied on: {formatDate(request.createdAt)}</p>
      </div>
      <Badge className={requestStatusColors[request.status] || 'bg-gray-100 text-gray-800'}>
        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
      </Badge>
    </div>
    
    <p className="text-sm mb-3 text-gray-700">
      <span className="font-medium text-gray-800">Reason:</span> {request.applicantInfo.reason}
    </p>
    
    {request.status === 'pending' && (
      <div className="flex space-x-2">
        <Button 
          size="sm" 
          onClick={() => onUpdateRequest(request.id, 'approved')}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Approve
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => onUpdateRequest(request.id, 'rejected')}
          className="border-red-500 text-red-500 hover:bg-red-50"
        >
          <XCircle className="mr-2 h-4 w-4" />
          Reject
        </Button>
      </div>
    )}
  </div>
);


const MyListedPetsList = ({ listedPets, requestsForMyPets, updateAdoptionRequest }) => {
  if (listedPets.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No pets listed</h3>
        <p className="text-gray-600 mb-6">
          You haven't listed any pets for adoption yet.
        </p>
        <Button asChild>
          <Link to="/add-pet">List a Pet</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {listedPets.map(pet => {
        const petSpecificRequests = requestsForMyPets.filter(req => req.petId === pet.id);
        return (
          <Card key={pet.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <span className="text-2xl font-bold text-primary">{pet.name}</span>
                <Badge className={`${petStatusColors[pet.status] || 'bg-gray-100 text-gray-800'} mt-2 sm:mt-0`}>
                  Status: {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-1">
                  <img 
                    src={pet.imageUrl} 
                    alt={pet.name} 
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Breed:</span> {pet.breed}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Age:</span> {pet.age} years old
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Gender:</span> {pet.gender}
                  </p>
                  <p className="text-gray-700 line-clamp-3 mb-4">
                    <span className="font-semibold">Description:</span> {pet.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Listed on: {formatDate(pet.createdAt)}
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/pets/${pet.id}`}>
                        View Pet Page
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Adoption Requests ({petSpecificRequests.length})
                </h4>
                
                {petSpecificRequests.length === 0 ? (
                  <div className="text-center py-6 bg-gray-50 rounded-md">
                     <MessageSquare className="h-10 w-10 mx-auto text-gray-400 mb-3" />
                     <p className="text-gray-600">No adoption requests for {pet.name} yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {petSpecificRequests.map(request => (
                      <ApplicantRequestCard 
                        key={request.id} 
                        request={request} 
                        onUpdateRequest={updateAdoptionRequest} 
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MyListedPetsList;