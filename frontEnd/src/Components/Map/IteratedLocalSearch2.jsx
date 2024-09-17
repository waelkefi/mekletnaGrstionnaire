import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

function optimizeRouteWithILS(addresses, times, sizes, capacity) {
  const numIterations = 100;
  const perturbationRate = 0.2;

  const distances = calculateDistances(addresses);

  let currentSolution = {
    addresses: addresses.slice(),
    times: times.slice(),
    sizes: sizes.slice(),
  };

  let capacityRemaining = capacity;

  for (let iteration = 0; iteration < numIterations; iteration++) {
    currentSolution = applyLocalSearch(currentSolution, distances, capacityRemaining,sizes);

    if (Math.random() < perturbationRate) {
      currentSolution = perturbSolution(currentSolution, distances, capacityRemaining,sizes);
    }
  }

  return currentSolution;
}

function calculateDistances(addresses) {
  const distances = [];

  for (let i = 0; i < addresses.length; i++) {
    const row = [];
    for (let j = 0; j < addresses.length; j++) {
      // Placeholder - vous devrez remplacer cela par un appel à l'API Google Maps pour obtenir les distances réelles
      row.push(faker.random.number({ min: 1, max: 10 }));
    }
    distances.push(row);
  }

  return distances;
}

function applyLocalSearch(solution, distances, capacityRemaining,sizes) {
  const newSolution = { ...solution };
  const index1 = Math.floor(Math.random() * newSolution.addresses.length);
  let index2 = Math.floor(Math.random() * newSolution.addresses.length);

  while (index2 === index1) {
    index2 = Math.floor(Math.random() * newSolution.addresses.length);
  }

  const distance = distances[index1][index2];

  if (capacityRemaining - sizes[index2] >= 0) {
    [newSolution.addresses[index1], newSolution.addresses[index2]] = [newSolution.addresses[index2], newSolution.addresses[index1]];
    capacityRemaining -= sizes[index2];
  }

  return newSolution;
}

function perturbSolution(solution, distances, capacityRemaining,sizes) {
  const newSolution = { ...solution };
  const index1 = Math.floor(Math.random() * newSolution.addresses.length);
  let index2 = Math.floor(Math.random() * newSolution.addresses.length);

  while (index2 === index1) {
    index2 = Math.floor(Math.random() * newSolution.addresses.length);
  }

  const distance = distances[index1][index2];

  if (capacityRemaining - sizes[index2] >= 0) {
    [newSolution.addresses[index1], newSolution.addresses[index2]] = [newSolution.addresses[index2], newSolution.addresses[index1]];
    capacityRemaining -= sizes[index2];
  } else {
    const indexMax = Math.max(index1, index2);
    const indexMin = Math.min(index1, index2);
    [newSolution.addresses[indexMax], newSolution.addresses[indexMin]] = [newSolution.addresses[indexMin], newSolution.addresses[indexMax]];
  }

  return newSolution;
}

function IteratedLocalSearch2() {
    const [optimizedRoute, setOptimizedRoute] = useState(null);

    useEffect(() => {
      const generateFakeData = () => {
        const numCustomers = 10;
  
        const addresses = Array.from({ length: numCustomers }, () => faker.address.streetAddress());
            
        const times = Array.from({ length: numCustomers }, () => faker.datatype.number({ min: 1, max: 5 })); // Use datatype.number for numerical generation
        
        const sizes = Array.from({ length: numCustomers }, () => faker.datatype.number({ min: 1, max: 3 })); // Use datatype.number for numerical generation
  
        return { addresses, times, sizes };
      };
  
      const fakeData = generateFakeData();
      setOptimizedRoute(optimizeRouteWithILS(fakeData.addresses, fakeData.times, fakeData.sizes, 4));
    }, []);

  return (
    <div>
      <h1>Optimisation de la tournée de livraisons avec ILS</h1>
      {optimizedRoute && (
        <>
          <p>Tournée optimisée :</p>
          <ul>
            {optimizedRoute.addresses.map((address, index) => (
              <li key={index}>{address}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default IteratedLocalSearch2;
