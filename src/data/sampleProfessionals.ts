import { Professional } from '../types';

export const SAMPLE_PROFESSIONALS: Professional[] = [
  {
    id: 'pro-1',
    name: 'Arun Kumar',
    serviceCategory: 'plumbing',
    serviceCategoryName: 'Plumbing',
    rating: 4.9,
    reviewCount: 245,
    experienceYears: 8,
    distanceKm: 1.2,
    location: 'Central Avenue, Sector 4',
    availableNow: true,
    availabilityStatus: 'Available Now',
    estimatedCharge: 300,
    profileImage: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
    phone: '+91 98451 22301',
    email: 'arun.kumar.fix@example.com',
    about: 'Certified master plumber with over 8 years of specialized hands-on experience in residential pipeline repairs, drain cleanouts, high-pressure booster pumps, and sanitary ware replacements. Known for prompt arrival and clean workmanship.',
    verified: true,
    emergencyReady: true,
    completedJobsCount: 420,
    servicesOffered: [
      { title: 'Water Tap & Valve Repair', price: 200, description: 'Fix dripping faucets, replace internal washers or cartridge' },
      { title: 'Pipe Leakage & Joint Sealing', price: 300, description: 'Permanent sealing or segment replacement for PVC/CPVC pipes' },
      { title: 'Blocked Drain Cleaning', price: 400, description: 'Mechanical snake drain cleaning for kitchen sinks and bathrooms' },
      { title: 'Complete Bathroom Fitting Installation', price: 800, description: 'Full sanitary ware installation including geyser plumbing' }
    ],
    reviews: [
      {
        id: 'rev-1',
        customerName: 'Robert Vance',
        rating: 5,
        comment: 'Arun arrived within 25 minutes of booking! Fixed a critical pipe burst under the kitchen sink swiftly without making any mess. Highly professional.',
        date: '2 days ago',
        serviceName: 'Pipe Leakage Fix'
      },
      {
        id: 'rev-2',
        customerName: 'Sneha Roy',
        rating: 5,
        comment: 'Very polite and knowledgeable plumber. Brought all tools and spare parts right away. Fair pricing as quoted.',
        date: '1 week ago',
        serviceName: 'Tap Replacement'
      },
      {
        id: 'rev-3',
        customerName: 'Marcus Bell',
        rating: 4.8,
        comment: 'Great service. Solved a persistent low water pressure problem in 40 minutes.',
        date: '2 weeks ago',
        serviceName: 'Booster Pump Check'
      }
    ]
  },
  {
    id: 'pro-2',
    name: 'Vikram Singh',
    serviceCategory: 'electrical',
    serviceCategoryName: 'Electrical Service',
    rating: 4.2,
    reviewCount: 98,
    experienceYears: 5,
    distanceKm: 2.1,
    location: 'Oakridge Colony, 2nd Main',
    availableNow: true,
    availabilityStatus: 'Available Now',
    estimatedCharge: 250,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    phone: '+91 97120 44512',
    email: 'vikram.singh.elec@example.com',
    about: 'Government-licensed electrician handling domestic circuits, short circuit tracing, switchboard upgrading, inverter wiring, and smart lighting installations. Safe and budget-friendly.',
    verified: true,
    emergencyReady: true,
    completedJobsCount: 180,
    servicesOffered: [
      { title: 'Switchboard Repair & Socket Replacement', price: 180, description: 'Fix burnt switches, replace modular plates' },
      { title: 'MCB Trip & Short Circuit Troubleshooting', price: 300, description: 'Locate grounding faults and rectify tripped breakers' },
      { title: 'Ceiling Fan Installation & Repair', price: 250, description: 'Bearing replacement, speed regulator repair, and mounting' },
      { title: 'Inverter & Battery Wiring', price: 500, description: 'Backup power setup and wire isolation' }
    ],
    reviews: [
      {
        id: 'rev-4',
        customerName: 'Anand Kumar',
        rating: 4,
        comment: 'Vikram resolved the tripping MCB breaker quickly. Good communication and took proper safety measures.',
        date: '3 days ago',
        serviceName: 'MCB Repair'
      },
      {
        id: 'rev-5',
        customerName: 'Clara Wilson',
        rating: 4.4,
        comment: 'Installed 3 ceiling fans and replaced bad sockets. Very reasonable service cost.',
        date: '3 weeks ago',
        serviceName: 'Fan & Socket Installation'
      }
    ]
  },
  {
    id: 'pro-3',
    name: 'David Miller',
    serviceCategory: 'tyre-puncture',
    serviceCategoryName: 'Tyre Puncture Service',
    rating: 3.8,
    reviewCount: 42,
    experienceYears: 3,
    distanceKm: 0.8,
    location: 'Metro Link Junction',
    availableNow: true,
    availabilityStatus: 'Available Now',
    estimatedCharge: 180,
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    phone: '+91 98842 11920',
    email: 'david.miller.tyres@example.com',
    about: 'Mobile tyre puncture assistance with portable compressor and puncture repair kits for tubeless and tube tyres. Fastest response around the metro junction corridor.',
    verified: false,
    emergencyReady: true,
    completedJobsCount: 115,
    servicesOffered: [
      { title: 'Tubeless Tyre Puncture Strip Fix', price: 150, description: 'Standard mushroom or strip repair with air refilling' },
      { title: 'Tube Tyre Patch Repair', price: 200, description: 'Wheel removal, tube vulcanization patch, and remount' },
      { title: 'Emergency Stepney/Spare Tyre Swap', price: 250, description: 'Jack up car, change flat tyre to spare wheel safely' }
    ],
    reviews: [
      {
        id: 'rev-6',
        customerName: 'George Clark',
        rating: 4,
        comment: 'Quick to arrive on the highway when my SUV got a flat tyre. Basic tools, got the job done fast.',
        date: '4 days ago',
        serviceName: 'Spare Tyre Swap'
      },
      {
        id: 'rev-7',
        customerName: 'Kavita Nair',
        rating: 3.5,
        comment: 'Took a little while to locate my exact spot, but the puncture fix was cheap and worked fine.',
        date: '1 month ago',
        serviceName: 'Tubeless Tyre Puncture'
      }
    ]
  },
  {
    id: 'pro-4',
    name: 'Rajesh Verma',
    serviceCategory: 'water-pipe',
    serviceCategoryName: 'Water Pipe Leakage',
    rating: 4.8,
    reviewCount: 310,
    experienceYears: 12,
    distanceKm: 1.8,
    location: 'Riverside Heights, Block C',
    availableNow: true,
    availabilityStatus: 'Available Now',
    estimatedCharge: 350,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    phone: '+91 99014 55678',
    email: 'rajesh.verma.water@example.com',
    about: 'Specialist in high-pressure water pipe leak detection, hidden wall seepage detection, overhead water tank float valve repairs, and main water pipeline fittings.',
    verified: true,
    emergencyReady: true,
    completedJobsCount: 650,
    servicesOffered: [
      { title: 'Concealed Wall Leakage Detection', price: 500, description: 'Pinpoint seepage without destroying tiles or plaster' },
      { title: 'Main Water Inflow Pipe Repair', price: 350, description: 'Replace burst elbows, couplings, or rusted iron pipes' },
      { title: 'Overhead Tank Ball Valve Replacement', price: 300, description: 'Stop overflow and install heavy brass ball float valve' }
    ],
    reviews: [
      {
        id: 'rev-8',
        customerName: 'Pooja Bhatt',
        rating: 5,
        comment: 'Rajesh is exceptionally skilled! We had water gushing behind the bathroom wall. He detected the crack immediately and fixed it neatly.',
        date: 'Yesterday',
        serviceName: 'Wall Leakage Repair'
      },
      {
        id: 'rev-9',
        customerName: 'Samuel Green',
        rating: 4.7,
        comment: 'Top quality repair, no more tank overflow. 100% recommended.',
        date: '2 weeks ago',
        serviceName: 'Overhead Tank Valve'
      }
    ]
  },
  {
    id: 'pro-5',
    name: 'Priya Sharma',
    serviceCategory: 'ac-repair',
    serviceCategoryName: 'AC Repair',
    rating: 4.7,
    reviewCount: 188,
    experienceYears: 7,
    distanceKm: 2.8,
    location: 'Tech Hub Boulevard, 5th Cross',
    availableNow: true,
    availabilityStatus: 'Available Now',
    estimatedCharge: 450,
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    phone: '+91 98765 88901',
    email: 'priya.sharma.ac@example.com',
    about: 'Certified HVAC engineer specializing in Split and Inverter AC maintenance, refrigerant leak checks, chemical foam coil deep-cleaning, and capacitor replacement.',
    verified: true,
    emergencyReady: false,
    completedJobsCount: 340,
    servicesOffered: [
      { title: 'AC Deep Foam Jet Cleaning', price: 450, description: 'Indoor coil pressure wash and outdoor unit jet cleaning' },
      { title: 'Refrigerant (Gas) Top-up & Leak Test', price: 1200, description: 'Nitrogen leak test, vacuuming, and pure R32/R410A gas refill' },
      { title: 'Compressor / Capacitor Repair', price: 650, description: 'Troubleshoot non-cooling compressor, replace dual capacitor' }
    ],
    reviews: [
      {
        id: 'rev-10',
        customerName: 'Ethan Wright',
        rating: 5,
        comment: 'Priya and her technician did a fantastic deep cleaning of two split AC units. Cooling is back to ice cold. Transparent rate card.',
        date: '3 days ago',
        serviceName: 'AC Jet Cleaning'
      },
      {
        id: 'rev-11',
        customerName: 'Deepak Reddy',
        rating: 4.5,
        comment: 'Fixed the noisy outdoor fan quickly. Arrived right on schedule.',
        date: '1 week ago',
        serviceName: 'Compressor Repair'
      }
    ]
  },
  {
    id: 'pro-6',
    name: 'Suresh Babu',
    serviceCategory: 'vehicle-repair',
    serviceCategoryName: 'Vehicle Repair',
    rating: 3.9,
    reviewCount: 56,
    experienceYears: 6,
    distanceKm: 3.5,
    location: 'West Bypass Highway Ring',
    availableNow: false,
    availabilityStatus: 'Available in 1 hr',
    estimatedCharge: 400,
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    phone: '+91 98450 33441',
    email: 'suresh.babu.garage@example.com',
    about: 'Experienced 2-wheeler and 4-wheeler roadside mechanic. Carries battery booster pack, brake fluid, engine coolant, spark plugs, and basic electronic diagnostic scanner.',
    verified: true,
    emergencyReady: true,
    completedJobsCount: 195,
    servicesOffered: [
      { title: 'Dead Battery Jumpstart Service', price: 350, description: 'Heavy duty booster cables, alternator voltage health check' },
      { title: 'Engine Overheating & Coolant Fix', price: 450, description: 'Radiator hose inspection, thermostat check, coolant bleeding' },
      { title: 'Brake Jam & Cable Repair', price: 400, description: 'On-spot brake pad inspect and hydraulic bleed' }
    ],
    reviews: [
      {
        id: 'rev-12',
        customerName: 'Rohan Joshi',
        rating: 4,
        comment: 'Battery died in office parking lot. Suresh arrived with a jump starter in 35 mins. Saved my evening.',
        date: '5 days ago',
        serviceName: 'Battery Jumpstart'
      },
      {
        id: 'rev-13',
        customerName: 'Maya Patel',
        rating: 3.8,
        comment: 'Decent roadside service. Solved bike starting trouble after heavy rain.',
        date: '3 weeks ago',
        serviceName: 'Engine Starting Issue'
      }
    ]
  },
  {
    id: 'pro-7',
    name: 'Karthik Rao',
    serviceCategory: 'refrigerator',
    serviceCategoryName: 'Refrigerator Repair',
    rating: 4.6,
    reviewCount: 112,
    experienceYears: 9,
    distanceKm: 3.2,
    location: 'Sunrise Enclave, Sector 8',
    availableNow: true,
    availabilityStatus: 'Available Now',
    estimatedCharge: 380,
    profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    phone: '+91 99401 77234',
    email: 'karthik.rao.fridge@example.com',
    about: 'Expert in Single Door, Double Door, and Side-by-Side refrigerators. Quick resolution for zero cooling, excess frost, water pooling, relay clicking, and thermostat breakdown.',
    verified: true,
    emergencyReady: false,
    completedJobsCount: 280,
    servicesOffered: [
      { title: 'Defrost Sensor & Timer Fix', price: 380, description: 'Resolve ice jamming freezer coils causing lower compartment heat' },
      { title: 'Compressor Relay & Overload Protector', price: 450, description: 'Replace burned starter relays for humming compressors' },
      { title: 'Door Gasket Magnetic Seal Replacement', price: 350, description: 'Stop cold air leaks and moisture condensation' }
    ],
    reviews: [
      {
        id: 'rev-14',
        customerName: 'Linda Davis',
        rating: 5,
        comment: 'Our fridge stopped cooling right before a weekend party! Karthik brought the exact relay needed and fixed it in 30 minutes.',
        date: '4 days ago',
        serviceName: 'Compressor Relay Repair'
      }
    ]
  },
  {
    id: 'pro-8',
    name: 'Farhan Ahmed',
    serviceCategory: 'washing-machine',
    serviceCategoryName: 'Washing Machine Repair',
    rating: 4.4,
    reviewCount: 79,
    experienceYears: 6,
    distanceKm: 4.1,
    location: 'Emerald Park, Block B',
    availableNow: true,
    availabilityStatus: 'Available Now',
    estimatedCharge: 350,
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    phone: '+91 98840 66721',
    email: 'farhan.ahmed.wash@example.com',
    about: 'Front-load and Top-load washing machine technician for all major brands (LG, Samsung, Bosch, IFB, Whirlpool). Solves drain errors, spinning noise, error codes, and drum belt slippage.',
    verified: true,
    emergencyReady: false,
    completedJobsCount: 160,
    servicesOffered: [
      { title: 'Drain Pump & Filter Unclogging', price: 300, description: 'Clean blocked coin trap and repair sluggish water drain' },
      { title: 'Drum Bearing & Suspension Rod Repair', price: 650, description: 'Eliminate heavy knocking and extreme spin vibrations' },
      { title: 'Water Inlet Solenoid Valve Fix', price: 380, description: 'Fix slow filling or continuous water flow issues' }
    ],
    reviews: [
      {
        id: 'rev-15',
        customerName: 'Meera Menon',
        rating: 4.5,
        comment: 'Diagnosed an OE drain error code instantly and cleared a coin stuck inside the impeller. Very good service.',
        date: '1 week ago',
        serviceName: 'Drain Pump Fix'
      }
    ]
  },
  {
    id: 'pro-9',
    name: 'Anthony D\'Souza',
    serviceCategory: 'carpenter',
    serviceCategoryName: 'Carpenter Service',
    rating: 4.5,
    reviewCount: 134,
    experienceYears: 11,
    distanceKm: 2.3,
    location: 'Civil Lines, Old Cantonment',
    availableNow: true,
    availabilityStatus: 'Available Now',
    estimatedCharge: 350,
    profileImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    phone: '+91 97412 88310',
    email: 'anthony.dsouza.wood@example.com',
    about: 'Skilled woodwork craftsman handling door realignment, smart electronic lock fitting, hydraulic cabinet hinge replacement, wardrobe sliding track fix, and custom minor carpentry.',
    verified: true,
    emergencyReady: false,
    completedJobsCount: 310,
    servicesOffered: [
      { title: 'Main Door Lock & Mortise Fitting', price: 350, description: 'Secure lock installation or jammed cylinder replacement' },
      { title: 'Modular Kitchen Soft-Close Hinges Fix', price: 250, description: 'Realign sagging cabinet shutters and fit soft-close hinges' },
      { title: 'Bed & Table Structural Tightening', price: 400, description: 'Reinforce wobbling wooden furniture with steel brackets' }
    ],
    reviews: [
      {
        id: 'rev-16',
        customerName: 'Amit Saxena',
        rating: 4.5,
        comment: 'Anthony fixed three loose cabinet doors and installed a new digital door lock cleanly. Neat woodwork.',
        date: '2 weeks ago',
        serviceName: 'Door Lock & Hinges'
      }
    ]
  },
  {
    id: 'pro-10',
    name: 'Anita Sen',
    serviceCategory: 'cleaning',
    serviceCategoryName: 'Cleaning Service',
    rating: 4.9,
    reviewCount: 290,
    experienceYears: 5,
    distanceKm: 1.5,
    location: 'Lakeside Residences, Tower 3',
    availableNow: true,
    availabilityStatus: 'Available Now',
    estimatedCharge: 550,
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    phone: '+91 99160 33419',
    email: 'anita.sen.clean@example.com',
    about: 'Professional hygienic cleaning team utilizing hospital-grade disinfectants, single-disc floor scrubbing machines, and steam sanitation for kitchens and bathrooms.',
    verified: true,
    emergencyReady: false,
    completedJobsCount: 520,
    servicesOffered: [
      { title: 'Deep Bathroom Sanitization (Per Bath)', price: 499, description: 'Hard water scale removal from tiles, fixtures, and commode' },
      { title: 'Intense Kitchen Degreasing', price: 799, description: 'Oil stain removal from chimney, backsplash, and cabinets' },
      { title: 'Fabric Sofa Shampooing (3-Seater)', price: 599, description: 'Wet extraction vacuuming to remove deep dirt and stains' }
    ],
    reviews: [
      {
        id: 'rev-17',
        customerName: 'Radhika Iyer',
        rating: 5,
        comment: 'Anita and her crew did miracles on my bathrooms. Removed stubborn hard water marks that nobody else could fix. Sparkling clean!',
        date: '3 days ago',
        serviceName: 'Bathroom Deep Cleaning'
      }
    ]
  },
  {
    id: 'pro-11',
    name: 'Ramesh Naidu',
    serviceCategory: 'appliance',
    serviceCategoryName: 'Home Appliance Repair',
    rating: 3.6,
    reviewCount: 38,
    experienceYears: 4,
    distanceKm: 4.8,
    location: 'Industrial Estate Outer Ring',
    availableNow: false,
    availabilityStatus: 'Busy',
    estimatedCharge: 280,
    profileImage: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80',
    phone: '+91 97311 00223',
    email: 'ramesh.naidu.appliances@example.com',
    about: 'General small appliance technician servicing water purifiers (RO/UV filter cartridge replacement), electric geysers, induction cooktops, and microwave ovens.',
    verified: false,
    emergencyReady: false,
    completedJobsCount: 95,
    servicesOffered: [
      { title: 'Water Purifier RO Membrane & Filter Service', price: 350, description: 'Sediment, carbon, and RO membrane replacement' },
      { title: 'Geyser Heating Element Replacement', price: 400, description: 'Fix water not heating or electrical shock in geyser' },
      { title: 'Microwave Heating / Turntable Fix', price: 300, description: 'Magnetron inspection and high voltage diode check' }
    ],
    reviews: [
      {
        id: 'rev-18',
        customerName: 'Girish Chandra',
        rating: 3.5,
        comment: 'Repaired the geyser coil. Was 20 minutes late due to traffic, but repair was effective.',
        date: '3 weeks ago',
        serviceName: 'Geyser Repair'
      }
    ]
  },
  {
    id: 'pro-12',
    name: 'Daniel Brooks',
    serviceCategory: 'emergency-repair',
    serviceCategoryName: 'Other Emergency Repairs',
    rating: 4.8,
    reviewCount: 165,
    experienceYears: 10,
    distanceKm: 1.1,
    location: 'Central Plaza Arcade',
    availableNow: true,
    availabilityStatus: 'Available Now',
    estimatedCharge: 400,
    profileImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    phone: '+91 98223 99401',
    email: 'daniel.brooks.emergency@example.com',
    about: '24/7 Rapid Emergency Response for residential and commercial crises: emergency lockout assistance, shattered glass boarding, jammed roll-up shutters, and post-storm repairs.',
    verified: true,
    emergencyReady: true,
    completedJobsCount: 380,
    servicesOffered: [
      { title: 'Emergency Home / Flat Lockout Access', price: 450, description: 'Non-destructive door opening for locked-out residents' },
      { title: 'Jammed Rolling Shutter Repair', price: 550, description: 'Free stuck spring mechanism or broken channel' },
      { title: 'Temporary Storm / Broken Glass Hazard Boarding', price: 500, description: 'Secure damaged windows and clear dangerous shards' }
    ],
    reviews: [
      {
        id: 'rev-19',
        customerName: 'Arthur Dent',
        rating: 5,
        comment: 'Locked outside my flat at 10 PM. Daniel arrived in 18 minutes with proper locksmith tools and got me inside in 5 minutes without damaging the door lock. Absolute lifesaver!',
        date: '5 days ago',
        serviceName: 'Emergency Lockout'
      }
    ]
  }
];
