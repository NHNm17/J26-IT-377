import { InspectionRecord } from '../types/inspection';

export const INITIAL_FABRIC_RECORDS: InspectionRecord[] = [
  {
    sampleId: "SMP-2026-0814-01",
    timestamp: "2026-10-14T14:48:30Z",
    batchNumber: "CNC-1871",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    opticalSensor: {
      red: 184,
      green: 192,
      blue: 205,
      clear: 680,
      dominantColorHex: "#b8c0cd"
    },
    capacitanceSensor: {
      ch1_pf: 4.82,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 25.4,
      humidityPercent: 61.8
    },
    aiClassification: {
      predictedFabricType: 'Cotton',
      confidence: 96.4,
      status: 'completed'
    },
    defectStatus: 'defect_detected',
    defects: [
      {
        id: "DEF-01-A",
        type: "tear",
        label: "Warp Yarn Tear",
        confidence: 91.5,
        boundingBox: { x: 38, y: 42, width: 22, height: 16 },
        severity: "high"
      }
    ],
    qualityGrade: 'Reject',
    operatorNotes: "Tear localized on right weave quadrant. Automated reject flag applied."
  },
  {
    sampleId: "SMP-2026-0814-02",
    timestamp: "2026-10-14T14:44:45Z",
    batchNumber: "CNC-1871",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",
    opticalSensor: {
      red: 210,
      green: 204,
      blue: 198,
      clear: 742,
      dominantColorHex: "#d2ccc6"
    },
    capacitanceSensor: {
      ch1_pf: 5.14,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 25.5,
      humidityPercent: 61.5
    },
    aiClassification: {
      predictedFabricType: 'Linen',
      confidence: 94.2,
      status: 'completed'
    },
    defectStatus: 'no_defect_detected',
    defects: [],
    qualityGrade: 'Grade A',
    operatorNotes: "Uniform cross-weave detected, no yarn slippage."
  },
  {
    sampleId: "SMP-2026-0814-03",
    timestamp: "2026-10-14T14:41:09Z",
    batchNumber: "CNC-1871",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
    opticalSensor: {
      red: 78,
      green: 82,
      blue: 94,
      clear: 310,
      dominantColorHex: "#4e525e"
    },
    capacitanceSensor: {
      ch1_pf: 3.25,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 25.6,
      humidityPercent: 61.2
    },
    aiClassification: {
      predictedFabricType: 'Polyester',
      confidence: 98.1,
      status: 'completed'
    },
    defectStatus: 'no_defect_detected',
    defects: [],
    qualityGrade: 'Grade A',
    operatorNotes: "High fiber uniformity, synthetic luster verified."
  },
  {
    sampleId: "SMP-2026-0814-04",
    timestamp: "2026-10-14T14:37:15Z",
    batchNumber: "CNC-1871",
    imageUrl: "https://images.unsplash.com/photo-1528458876861-544fd1761a91?w=800&auto=format&fit=crop&q=80",
    opticalSensor: {
      red: 165,
      green: 158,
      blue: 152,
      clear: 590,
      dominantColorHex: "#a59e98"
    },
    capacitanceSensor: {
      ch1_pf: 4.60,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 25.7,
      humidityPercent: 60.9
    },
    aiClassification: {
      predictedFabricType: 'Cotton-Poly Blend',
      confidence: 88.7,
      status: 'completed'
    },
    defectStatus: 'defect_detected',
    defects: [
      {
        id: "DEF-04-A",
        type: "hole",
        label: "Pin Hole Defect",
        confidence: 86.2,
        boundingBox: { x: 55, y: 30, width: 14, height: 14 },
        severity: "medium"
      },
      {
        id: "DEF-04-B",
        type: "weaving_defect",
        label: "Misaligned Weft",
        confidence: 79.4,
        boundingBox: { x: 15, y: 70, width: 45, height: 12 },
        severity: "low"
      }
    ],
    qualityGrade: 'Grade B',
    operatorNotes: "Minor pinhole and tension shift in bottom left."
  },
  {
    sampleId: "SMP-2026-0814-05",
    timestamp: "2026-10-14T14:30:22Z",
    batchNumber: "CNC-1870",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    opticalSensor: {
      red: 235,
      green: 232,
      blue: 228,
      clear: 820,
      dominantColorHex: "#ebe8e4"
    },
    ambientSensor: {
      temperatureC: 25.7,
      humidityPercent: 60.8
    },
    aiClassification: {
      predictedFabricType: 'Silk',
      confidence: 93.8,
      status: 'completed'
    },
    defectStatus: 'no_defect_detected',
    defects: [],
    qualityGrade: 'Grade A',
    operatorNotes: "Delicate filament weave intact. FDC1004 capacitance bypassed for fragile silk test."
  },
  {
    sampleId: "SMP-2026-0814-06",
    timestamp: "2026-10-14T14:24:50Z",
    batchNumber: "CNC-1870",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",
    opticalSensor: {
      red: 198,
      green: 185,
      blue: 172,
      clear: 640,
      dominantColorHex: "#c6b9ac"
    },
    capacitanceSensor: {
      ch1_pf: 4.95,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 25.8,
      humidityPercent: 60.5
    },
    aiClassification: {
      predictedFabricType: 'Cotton',
      confidence: 95.1,
      status: 'completed'
    },
    defectStatus: 'defect_detected',
    defects: [
      {
        id: "DEF-06-A",
        type: "stain",
        label: "Oil Spot Contamination",
        confidence: 93.0,
        boundingBox: { x: 62, y: 58, width: 20, height: 18 },
        severity: "high"
      }
    ],
    qualityGrade: 'Reject',
    operatorNotes: "Surface stain flagged by optical contrast threshold."
  },
  {
    sampleId: "SMP-2026-0814-07",
    timestamp: "2026-10-14T14:18:04Z",
    batchNumber: "CNC-1870",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
    opticalSensor: {
      red: 95,
      green: 102,
      blue: 120,
      clear: 390,
      dominantColorHex: "#5f6678"
    },
    capacitanceSensor: {
      ch1_pf: 3.40,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 25.9,
      humidityPercent: 60.2
    },
    aiClassification: {
      predictedFabricType: 'Polyester',
      confidence: 97.5,
      status: 'completed'
    },
    defectStatus: 'no_defect_detected',
    defects: [],
    qualityGrade: 'Grade A',
    operatorNotes: "Consistent yarn spacing verified."
  },
  {
    sampleId: "SMP-2026-0814-08",
    timestamp: "2026-10-14T14:10:12Z",
    batchNumber: "CNC-1869",
    imageUrl: "https://images.unsplash.com/photo-1528458876861-544fd1761a91?w=800&auto=format&fit=crop&q=80",
    opticalSensor: {
      red: 172,
      green: 168,
      blue: 160,
      clear: 615,
      dominantColorHex: "#aca8a0"
    },
    capacitanceSensor: {
      ch1_pf: 4.70,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 26.0,
      humidityPercent: 59.8
    },
    aiClassification: {
      status: 'pending'
    },
    defectStatus: 'pending',
    defects: [],
    qualityGrade: 'Pending Review',
    operatorNotes: "Sensor readings captured. Fabric image queued for Member 3 YOLO worker."
  },
  {
    sampleId: "SMP-2026-0814-09",
    timestamp: "2026-10-14T14:02:45Z",
    batchNumber: "CNC-1869",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    opticalSensor: {
      red: 180,
      green: 184,
      blue: 195,
      clear: 660,
      dominantColorHex: "#b4b8c3"
    },
    ambientSensor: {
      temperatureC: 26.1,
      humidityPercent: 59.5
    },
    aiClassification: {
      predictedFabricType: 'Cotton',
      confidence: 92.0,
      status: 'completed'
    },
    defectStatus: 'defect_result_unavailable',
    defects: [],
    qualityGrade: 'Pending Review',
    operatorNotes: "Camera exposure calibration during pass; defect inference skipped."
  },
  {
    sampleId: "SMP-2026-0814-10",
    timestamp: "2026-10-14T13:55:18Z",
    batchNumber: "CNC-1869",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",
    opticalSensor: {
      red: 205,
      green: 195,
      blue: 180,
      clear: 710,
      dominantColorHex: "#cdc3b4"
    },
    capacitanceSensor: {
      ch1_pf: 5.20,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 26.2,
      humidityPercent: 59.1
    },
    aiClassification: {
      predictedFabricType: 'Linen',
      confidence: 96.0,
      status: 'completed'
    },
    defectStatus: 'defect_detected',
    defects: [
      {
        id: "DEF-10-A",
        type: "wrinkle",
        label: "Severe Surface Crease",
        confidence: 84.8,
        boundingBox: { x: 25, y: 15, width: 50, height: 35 },
        severity: "medium"
      }
    ],
    qualityGrade: 'Grade B',
    operatorNotes: "Crease pattern observed along feeder boundary."
  },
  {
    sampleId: "SMP-2026-0814-11",
    timestamp: "2026-10-14T13:48:00Z",
    batchNumber: "CNC-1868",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
    opticalSensor: {
      red: 88,
      green: 94,
      blue: 110,
      clear: 350,
      dominantColorHex: "#585e6e"
    },
    capacitanceSensor: {
      ch1_pf: 3.30,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 26.3,
      humidityPercent: 58.9
    },
    aiClassification: {
      predictedFabricType: 'Polyester',
      confidence: 99.0,
      status: 'completed'
    },
    defectStatus: 'no_defect_detected',
    defects: [],
    qualityGrade: 'Grade A',
    operatorNotes: "High tensile uniformity."
  },
  {
    sampleId: "SMP-2026-0814-12",
    timestamp: "2026-10-14T13:40:11Z",
    batchNumber: "CNC-1868",
    imageUrl: "https://images.unsplash.com/photo-1528458876861-544fd1761a91?w=800&auto=format&fit=crop&q=80",
    opticalSensor: {
      red: 175,
      green: 170,
      blue: 162,
      clear: 630,
      dominantColorHex: "#afa0a2"
    },
    capacitanceSensor: {
      ch1_pf: 4.75,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 26.4,
      humidityPercent: 58.6
    },
    aiClassification: {
      predictedFabricType: 'Cotton-Poly Blend',
      confidence: 91.2,
      status: 'completed'
    },
    defectStatus: 'no_defect_detected',
    defects: [],
    qualityGrade: 'Grade A',
    operatorNotes: "Standard commercial specification met."
  }
];
