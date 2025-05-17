export const initialPetsData = [
  {
    id: '1', name: 'Max', type: 'Dog', breed: 'Golden Retriever', age: 3, gender: 'Male', size: 'Large',
    description: 'Max is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He is great with children and other pets.',
    location: 'New York, NY', status: 'available', createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=612&q=80',
    userId: 'demoUser1' 
  },
  {
    id: '2', name: 'Bella', type: 'Cat', breed: 'Siamese', age: 2, gender: 'Female', size: 'Medium',
    description: 'Bella is a sweet and affectionate Siamese cat who enjoys cuddling and playing with toys. She is litter trained and gets along well with other cats.',
    location: 'Los Angeles, CA', status: 'available', createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    imageUrl: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    userId: 'demoUser2'
  },
  {
    id: '3', name: 'Charlie', type: 'Dog', breed: 'Beagle', age: 1, gender: 'Male', size: 'Medium',
    description: 'Charlie is a playful and curious Beagle puppy who loves to explore. He is partially trained and eager to learn new commands.',
    location: 'Chicago, IL', status: 'pending', createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    imageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    userId: 'demoUser1'
  },
  {
    id: '4', name: 'Luna', type: 'Cat', breed: 'Maine Coon', age: 4, gender: 'Female', size: 'Large',
    description: 'Luna is a majestic Maine Coon with a gentle personality. She enjoys lounging by windows and being brushed. She is well-behaved and independent.',
    location: 'Seattle, WA', status: 'adopted', createdAt: new Date(Date.now() - 86400000 * 15).toISOString(), // 15 days ago
    imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    userId: 'demoUser2'
  },
  {
    id: '5', name: 'Rocky', type: 'Dog', breed: 'German Shepherd', age: 5, gender: 'Male', size: 'Large',
    description: 'Rocky is a loyal and intelligent German Shepherd who has been trained in basic commands. He is protective and would make an excellent family guardian.',
    location: 'Denver, CO', status: 'available', createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    imageUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    userId: 'demoUser1'
  },
  {
    id: '6', name: 'Coco', type: 'Other', breed: 'Holland Lop Rabbit', age: 1, gender: 'Female', size: 'Small',
    description: 'Coco is an adorable Holland Lop rabbit who loves to hop around and eat fresh vegetables. She is litter trained and enjoys being petted.',
    location: 'Austin, TX', status: 'available', createdAt: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
    imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    userId: 'demoUser2'
  }
];

export const initialProductsData = [
  {
    id: 'prod1', name: 'Premium Dog Food - Chicken & Rice', category: 'Food', price: 59.99,
    description: 'High-quality dry dog food made with real chicken and wholesome rice. Suitable for all breeds and life stages. Provides complete and balanced nutrition.',
    imageUrl: 'https://images.unsplash.com/photo-1587600954298-9731305f055e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    stock: 50, rating: 4.8, reviews: 120, tags: ['dog', 'food', 'dry food', 'premium']
  },
  {
    id: 'prod2', name: 'Interactive Cat Teaser Wand', category: 'Toys', price: 12.50,
    description: 'Engage your cat in hours of fun with this interactive teaser wand. Features feathers and bells to stimulate natural hunting instincts.',
    imageUrl: 'https://images.unsplash.com/photo-1592769606134-34b83ef61502?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    stock: 100, rating: 4.5, reviews: 85, tags: ['cat', 'toy', 'interactive', 'teaser']
  },
  {
    id: 'prod3', name: 'Cozy Pet Bed - Medium', category: 'Accessories', price: 35.00,
    description: 'A soft and comfortable bed for your furry friend. Made with plush materials and a non-slip bottom. Machine washable for easy cleaning.',
    imageUrl: 'https://images.unsplash.com/photo-1580477880092-1296d807520d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    stock: 30, rating: 4.7, reviews: 95, tags: ['bed', 'dog', 'cat', 'cozy', 'accessory']
  },
  {
    id: 'prod4', name: 'Grain-Free Salmon Cat Food', category: 'Food', price: 22.99,
    description: 'Delicious and nutritious grain-free cat food with real salmon as the first ingredient. Supports healthy skin and coat.',
    imageUrl: 'https://images.unsplash.com/photo-1626201496369-a09f96f198cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    stock: 75, rating: 4.6, reviews: 110, tags: ['cat', 'food', 'grain-free', 'salmon']
  },
  {
    id: 'prod5', name: 'Durable Chew Toy for Dogs', category: 'Toys', price: 15.99,
    description: 'A tough and durable chew toy designed for aggressive chewers. Helps clean teeth and promote healthy chewing habits.',
    imageUrl: 'https://images.unsplash.com/photo-1604928149621-e301ef18e8e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    stock: 60, rating: 4.3, reviews: 70, tags: ['dog', 'toy', 'chew', 'durable']
  },
  {
    id: 'prod6', name: 'Adjustable Nylon Pet Collar', category: 'Accessories', price: 9.99,
    description: 'A stylish and durable nylon collar for dogs and cats. Adjustable for a comfortable fit and features a sturdy D-ring for leash attachment.',
    imageUrl: 'https://images.unsplash.com/photo-1588012886040-489592e58390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    stock: 120, rating: 4.4, reviews: 90, tags: ['collar', 'dog', 'cat', 'accessory', 'nylon']
  },
];

export const initialAppointmentsData = [
  {
    id: 'appt1', userId: 'demoUser1', petName: 'Max', service: 'Annual Checkup', date: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
    time: '10:00 AM', notes: 'Max seems healthy, just a routine check.', status: 'Scheduled'
  },
  {
    id: 'appt2', userId: 'demoUser2', petName: 'Bella', service: 'Vaccination', date: new Date(Date.now() + 86400000 * 14).toISOString(), // 14 days from now
    time: '02:30 PM', notes: 'Booster shots due.', status: 'Scheduled'
  },
];

export const treatmentServicesData = [
  { 
    id: 'treat1', name: 'Annual Wellness Exams', 
    description: 'Comprehensive check-ups to monitor your pet\'s overall health, including physical examination, parasite screening, and discussion of preventative care.',
    icon: 'Stethoscope', category: 'Preventative Care', duration: '30-45 mins', priceRange: '$50 - $75'
  },
  { 
    id: 'treat2', name: 'Vaccinations', 
    description: 'Core and non-core vaccines tailored to your pet\'s lifestyle and risk factors to protect against common infectious diseases.',
    icon: 'ShieldCheck', category: 'Preventative Care', duration: '15-30 mins', priceRange: '$20 - $40 per vaccine'
  },
  { 
    id: 'treat3', name: 'Dental Cleaning & Care', 
    description: 'Professional dental cleanings, polishing, and extractions if needed. We also provide guidance on at-home dental care.',
    icon: 'Tooth', category: 'Dental Care', duration: '1-3 hours (under anesthesia)', priceRange: '$300 - $800'
  },
  { 
    id: 'treat4', name: 'Spay & Neuter Surgery', 
    description: 'Routine surgical procedures to prevent unwanted litters and reduce the risk of certain health problems.',
    icon: 'Scissors', category: 'Surgical Procedures', duration: 'Varies', priceRange: '$200 - $500'
  },
  { 
    id: 'treat5', name: 'Microchipping', 
    description: 'Permanent identification for your pet. A quick and simple procedure that greatly increases the chances of being reunited if lost.',
    icon: 'ScanSearch', category: 'General Services', duration: '10-15 mins', priceRange: '$40 - $60'
  },
  { 
    id: 'treat6', name: 'Nutritional Counseling', 
    description: 'Expert advice on the best diet for your pet based on their age, breed, health conditions, and lifestyle.',
    icon: 'Apple', category: 'Wellness & Consultation', duration: '30-60 mins', priceRange: '$75 - $150'
  },
  { 
    id: 'treat7', name: 'Behavioral Consultation', 
    description: 'Addressing common behavioral issues such as anxiety, aggression, or destructive habits with professional guidance and training plans.',
    icon: 'Brain', category: 'Wellness & Consultation', duration: '60-90 mins', priceRange: '$100 - $200'
  },
  { 
    id: 'treat8', name: 'Emergency Care (During Hours)', 
    description: 'Urgent medical attention for acute illnesses or injuries during our regular operating hours. Please call ahead.',
    icon: 'TriangleAlert', category: 'Urgent Care', duration: 'Varies', priceRange: 'Varies based on condition'
  },
];