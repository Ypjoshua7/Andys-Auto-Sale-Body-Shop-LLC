// Sample Data Storage
const vehicleData = [
    {
        id: 1,
        year: 2021,
        make: "Honda",
        model: "Accord",
        price: 24995,
        mileage: 32000,
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
        transmission: "Automatic",
        fuel_type: "Gasoline",
        body_type: "Sedan",
        exterior_color: "Silver",
        interior_color: "Black",
        engine: "1.5L Turbo 4-Cylinder",
        features: ["Leather Seats", "Backup Camera", "Bluetooth", "Apple CarPlay"],
        status: "Available"
    },
    {
        id: 2,
        year: 2020,
        make: "Toyota",
        model: "RAV4",
        price: 27500,
        mileage: 28500,
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
        transmission: "Automatic",
        fuel_type: "Gasoline",
        body_type: "SUV",
        exterior_color: "Blue",
        interior_color: "Gray",
        engine: "2.5L 4-Cylinder",
        features: ["AWD", "Sunroof", "Heated Seats", "Navigation"],
        status: "Available"
    },
    {
        id: 3,
        year: 2019,
        make: "Ford",
        model: "F-150",
        price: 32900,
        mileage: 45000,
        image: "https://images.unsplash.com/photo-1587836374551-dfa7e00f5eb2?w=800",
        transmission: "Automatic",
        fuel_type: "Gasoline",
        body_type: "Truck",
        exterior_color: "Red",
        interior_color: "Black",
        engine: "5.0L V8",
        features: ["4WD", "Towing Package", "Bed Liner", "Backup Camera"],
        status: "Available"
    },
    {
        id: 4,
        year: 2022,
        make: "Chevrolet",
        model: "Silverado 1500",
        price: 38500,
        mileage: 15000,
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
        transmission: "Automatic",
        fuel_type: "Gasoline",
        body_type: "Truck",
        exterior_color: "Black",
        interior_color: "Gray",
        engine: "5.3L V8",
        features: ["4WD", "Leather Interior", "Heated Seats", "Apple CarPlay"],
        status: "Available"
    },
    {
        id: 5,
        year: 2019,
        make: "BMW",
        model: "3 Series",
        price: 28900,
        mileage: 42000,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
        transmission: "Automatic",
        fuel_type: "Gasoline",
        body_type: "Sedan",
        exterior_color: "Gray",
        interior_color: "Black Leather",
        engine: "2.0L Turbo 4-Cylinder",
        features: ["Leather Interior", "Sunroof", "Navigation", "Premium Sound"],
        status: "Available"
    },
    {
        id: 6,
        year: 2021,
        make: "Mazda",
        model: "CX-5",
        price: 26500,
        mileage: 22000,
        image: "https://images.unsplash.com/photo-1617531653520-bd466d147c92?w=800",
        transmission: "Automatic",
        fuel_type: "Gasoline",
        body_type: "SUV",
        exterior_color: "Red",
        interior_color: "Black",
        engine: "2.5L 4-Cylinder",
        features: ["AWD", "Leather Seats", "Sunroof", "Apple CarPlay"],
        status: "Available"
    }
];

// Store data in localStorage for persistence
function saveVehicles() {
    localStorage.setItem('vehicles', JSON.stringify(vehicleData));
}

function getVehicles() {
    const stored = localStorage.getItem('vehicles');
    return stored ? JSON.parse(stored) : vehicleData;
}

// Initialize data
if (!localStorage.getItem('vehicles')) {
    saveVehicles();
}