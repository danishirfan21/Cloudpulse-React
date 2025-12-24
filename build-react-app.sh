#!/bin/bash

# Create all necessary directories
mkdir -p src/pages
mkdir -p src/components/{common,services,apis}

# Create placeholder pages
for page in APIs Databases Logs Alerts Settings; do
  cat > src/pages/${page}.tsx << PAGEEOF
import React from 'react';

const ${page}: React.FC = () => {
  return (
    <div className="p-4 md:p-6 lg:p-10 w-full overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">${page}</h1>
          <p className="text-[#8b93a7]">${page} page coming soon</p>
        </div>
        <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-20 text-center">
          <h2 className="text-2xl font-semibold mb-2">${page} Module</h2>
          <p className="text-[#8b93a7]">This feature is under development</p>
        </div>
      </div>
    </div>
  );
};

export default ${page};
PAGEEOF
done

echo "Placeholder pages created successfully!"
