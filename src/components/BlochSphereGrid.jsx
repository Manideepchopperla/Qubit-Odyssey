import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlochSphere3D } from './BlochSphere3D';

export const BlochSphereGrid = ({ qubitCount, purityValues }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: qubitCount }, (_, index) => {
        // Generate consistent state values for display
        const stateValues = {
          x: (Math.sin((index + 1) * 1.1) * (purityValues[index] || 0)).toFixed(3),
          y: (Math.cos((index + 1) * 1.3) * (purityValues[index] || 0)).toFixed(3),
          z: (Math.sin((index + 1) * 1.7) * (purityValues[index] || 0)).toFixed(3)
        };

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.03, y: -5 }}
          >
            <Card className="glass-strong quantum-hover border-border-quantum group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-quantum text-quantum-cyan group-hover:text-quantum-cyan-light transition-colors">
                    Qubit {index}
                  </CardTitle>
                  <Badge 
                    variant="quantum" 
                    className="border-quantum-purple/50 bg-quantum-purple/20 text-quantum-purple group-hover:bg-quantum-purple/30 transition-colors"
                  >
                    Purity: {purityValues[index]?.toFixed(3) || '0.000'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-space-card/60 to-space-deep/60 rounded-xl border border-border-purple/50 overflow-hidden mb-6 group-hover:border-quantum-cyan/50 transition-colors">
                  <BlochSphere3D 
                    qubitIndex={index}
                    purity={purityValues[index] || 0}
                  />
                </div>
                
                <div className="space-y-3 text-sm font-quantum">
                  <div className="flex justify-between items-center p-2 rounded-lg bg-space-card/30">
                    <span className="text-text-muted">X:</span>
                    <span className="text-quantum-cyan font-bold">
                      {stateValues.x}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-space-card/30">
                    <span className="text-text-muted">Y:</span>
                    <span className="text-quantum-magenta font-bold">
                      {stateValues.y}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-space-card/30">
                    <span className="text-text-muted">Z:</span>
                    <span className="text-quantum-purple font-bold">
                      {stateValues.z}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};