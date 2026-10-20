import { InspectionRecord } from '../types/inspection';

/**
 * Fabric Dataset
 
 * All non-related fabrics and products removed in compliance with project specifications.
 */
export const INITIAL_FABRIC_RECORDS: InspectionRecord[] = [
  {
    sampleId: "SMP-SILK-0814-01",
    timestamp: "2026-10-14T14:48:30Z",
    batchNumber: "CNC-1871",
    imageUrl: "/fabrics/1.webp",
    opticalSensor: {
      red: 204,
      green: 194,
      blue: 180,
      clear: 730,
      dominantColorHex: "#ccc2b4"
    },
    capacitanceSensor: {
      ch1_pf: 5.12,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 25.4,
      humidityPercent: 61.8
    },
    aiClassification: {
      predictedFabricType: 'Silk',
      confidence: 96.8,
      status: 'completed'
    },
    defectStatus: 'defect_detected',
    defects: [
      {
        id: "DEF-01-A",
        type: "tear",
        label: "Warp Yarn Flax Tear",
        confidence: 92.4,
        boundingBox: { x: 38, y: 42, width: 22, height: 16 },
        severity: "high"
      }
    ],
    qualityGrade: 'Reject',
    operatorNotes: "Flax yarn tear localized on right weave quadrant. Automated reject flag applied."
  },
  {
    sampleId: "SMP-POLYESTER-0814-02",
    timestamp: "2026-10-14T14:44:45Z",
    batchNumber: "CNC-1871",
    imageUrl: "/fabrics/2.webp",
    opticalSensor: {
      red: 218,
      green: 210,
      blue: 198,
      clear: 755,
      dominantColorHex: "#dad2c6"
    },
    capacitanceSensor: {
      ch1_pf: 5.24,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 25.5,
      humidityPercent: 61.5
    },
    aiClassification: {
      predictedFabricType: 'Polyester',
      confidence: 95.6,
      status: 'completed'
    },
    defectStatus: 'no_defect_detected',
    defects: [],
    qualityGrade: 'Grade A',
    operatorNotes: "Uniform cross-weave detected; typical Belgian linen slub distribution intact."
  },
  {
    sampleId: "SMP-LINEN-0814-03",
    timestamp: "2026-10-14T14:41:09Z",
    batchNumber: "CNC-1871",
    imageUrl: "/fabrics/3.webp",
    opticalSensor: {
      red: 226,
      green: 222,
      blue: 214,
      clear: 790,
      dominantColorHex: "#e2ded6"
    },
    capacitanceSensor: {
      ch1_pf: 4.98,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 25.6,
      humidityPercent: 61.2
    },
    aiClassification: {
      predictedFabricType: 'Linen',
      confidence: 97.4,
      status: 'completed'
    },
    defectStatus: 'no_defect_detected',
    defects: [],
    qualityGrade: 'Grade A',
    operatorNotes: "Soft washed finish with optimal breathability and zero surface pills."
  },
  {
    sampleId: "SMP-COTTON-0814-04",
    timestamp: "2026-10-14T14:37:15Z",
    batchNumber: "CNC-1871",
    imageUrl: "/fabrics/4.webp",
    opticalSensor: {
      red: 236,
      green: 234,
      blue: 230,
      clear: 840,
      dominantColorHex: "#eceae6"
    },
    capacitanceSensor: {
      ch1_pf: 4.85,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 25.7,
      humidityPercent: 60.9
    },
    aiClassification: {
      predictedFabricType: 'Cotton',
      confidence: 93.9,
      status: 'completed'
    },
    defectStatus: 'defect_detected',
    defects: [
      {
        id: "DEF-04-A",
        type: "hole",
        label: "Weft Needle Pinhole",
        confidence: 88.5,
        boundingBox: { x: 55, y: 30, width: 14, height: 14 },
        severity: "medium"
      },
      {
        id: "DEF-04-B",
        type: "weaving_defect",
        label: "Misaligned Flax Weft",
        confidence: 81.2,
        boundingBox: { x: 15, y: 70, width: 45, height: 12 },
        severity: "low"
      }
    ],
    qualityGrade: 'Grade B',
    operatorNotes: "Pinhole and tension deviation flagged along lower edge."
  },
  {
    sampleId: "SMP-COTTON-POLY-0814-05",
    timestamp: "2026-10-14T14:30:22Z",
    batchNumber: "CNC-1870",
    imageUrl: "/fabrics/5.webp",
    opticalSensor: {
      red: 195,
      green: 182,
      blue: 168,
      clear: 670,
      dominantColorHex: "#c3b6a8"
    },
    capacitanceSensor: {
      ch1_pf: 5.38,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 25.7,
      humidityPercent: 60.8
    },
    aiClassification: {
      predictedFabricType: 'Cotton Poly Blend',
      confidence: 98.2,
      status: 'completed'
    },
    defectStatus: 'no_defect_detected',
    defects: [],
    qualityGrade: 'Grade A',
    operatorNotes: "Dense upholstery-grade linen canvas weave; high tensile strength validated."
  },
  {
    sampleId: "SMP-SILK-0814-06",
    timestamp: "2026-10-14T14:24:50Z",
    batchNumber: "CNC-1870",
    imageUrl: "/fabrics/1.webp",
    opticalSensor: {
      red: 212,
      green: 200,
      blue: 185,
      clear: 710,
      dominantColorHex: "#d4c8b9"
    },
    capacitanceSensor: {
      ch1_pf: 5.05,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 25.8,
      humidityPercent: 60.5
    },
    aiClassification: {
      predictedFabricType: 'Silk',
      confidence: 94.7,
      status: 'completed'
    },
    defectStatus: 'defect_detected',
    defects: [
      {
        id: "DEF-06-A",
        type: "stain",
        label: "Loom Oil Contamination",
        confidence: 94.1,
        boundingBox: { x: 62, y: 58, width: 20, height: 18 },
        severity: "high"
      }
    ],
    qualityGrade: 'Reject',
    operatorNotes: "Loom lubricant oil droplet identified on natural flax surface."
  },
  {
    sampleId: "SMP-POLYESTER-0814-07",
    timestamp: "2026-10-14T14:18:04Z",
    batchNumber: "CNC-1870",
    imageUrl: "/fabrics/2.webp",
    opticalSensor: {
      red: 178,
      green: 172,
      blue: 165,
      clear: 630,
      dominantColorHex: "#b2aca5"
    },
    capacitanceSensor: {
      ch1_pf: 5.15,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 25.9,
      humidityPercent: 60.2
    },
    aiClassification: {
      predictedFabricType: 'Polyester',
      confidence: 96.3,
      status: 'completed'
    },
    defectStatus: 'no_defect_detected',
    defects: [],
    qualityGrade: 'Grade A',
    operatorNotes: "Crisp herringbone twill pattern with precise chevron alignment."
  },
  {
    sampleId: "SMP-LINEN-0814-08",
    timestamp: "2026-10-14T14:10:12Z",
    batchNumber: "CNC-1869",
    imageUrl: "/fabrics/3.webp",
    opticalSensor: {
      red: 188,
      green: 178,
      blue: 164,
      clear: 645,
      dominantColorHex: "#bcb2a4"
    },
    capacitanceSensor: {
      ch1_pf: 5.22,
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
    operatorNotes: "Raw flax linen sample logged. Micro-image queued for YOLO model inference."
  },
  {
    sampleId: "SMP-COTTON-0814-09",
    timestamp: "2026-10-14T14:02:45Z",
    batchNumber: "CNC-1869",
    imageUrl: "/fabrics/4.webp",
    opticalSensor: {
      red: 205,
      green: 198,
      blue: 186,
      clear: 720,
      dominantColorHex: "#cdc6ba"
    },
    ambientSensor: {
      temperatureC: 26.1,
      humidityPercent: 59.5
    },
    aiClassification: {
      predictedFabricType: 'Cotton',
      confidence: 93.1,
      status: 'completed'
    },
    defectStatus: 'defect_result_unavailable',
    defects: [],
    qualityGrade: 'Pending Review',
    operatorNotes: "Optical strobe synchronization skipped during fast roll feed."
  },
  {
    sampleId: "SMP-COTTON-POLY-0814-10",
    timestamp: "2026-10-14T13:55:18Z",
    batchNumber: "CNC-1869",
    imageUrl: "/fabrics/5.webp",
    opticalSensor: {
      red: 228,
      green: 224,
      blue: 216,
      clear: 810,
      dominantColorHex: "#e4e0d8"
    },
    capacitanceSensor: {
      ch1_pf: 5.30,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 26.2,
      humidityPercent: 59.1
    },
    aiClassification: {
      predictedFabricType: 'Cotton Poly Blend',
      confidence: 97.1,
      status: 'completed'
    },
    defectStatus: 'defect_detected',
    defects: [
      {
        id: "DEF-10-A",
        type: "wrinkle",
        label: "Excessive Weave Crease",
        confidence: 86.4,
        boundingBox: { x: 25, y: 15, width: 50, height: 35 },
        severity: "medium"
      }
    ],
    qualityGrade: 'Grade B',
    operatorNotes: "Mechanical crease along tension roller boundary. Feeder alignment adjusted."
  },
  {
    sampleId: "SMP-SILK-0814-11",
    timestamp: "2026-10-14T13:48:00Z",
    batchNumber: "CNC-1868",
    imageUrl: "/fabrics/1.webp",
    opticalSensor: {
      red: 140,
      green: 144,
      blue: 155,
      clear: 490,
      dominantColorHex: "#8c909b"
    },
    capacitanceSensor: {
      ch1_pf: 4.90,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 26.3,
      humidityPercent: 58.9
    },
    aiClassification: {
      predictedFabricType: 'Silk',
      confidence: 98.7,
      status: 'completed'
    },
    defectStatus: 'no_defect_detected',
    defects: [],
    qualityGrade: 'Grade A',
    operatorNotes: "Charcoal yarn-dyed Belgian linen. High weave uniformity verified."
  },
  {
    sampleId: "SMP-POLYESTER-0814-12",
    timestamp: "2026-10-14T13:40:11Z",
    batchNumber: "CNC-1868",
    imageUrl: "/fabrics/2.webp",
    opticalSensor: {
      red: 185,
      green: 180,
      blue: 172,
      clear: 650,
      dominantColorHex: "#b9b4ac"
    },
    capacitanceSensor: {
      ch1_pf: 5.08,
      status: 'connected'
    },
    ambientSensor: {
      temperatureC: 26.4,
      humidityPercent: 58.6
    },
    aiClassification: {
      predictedFabricType: 'Polyester',
      confidence: 95.2,
      status: 'completed'
    },
    defectStatus: 'no_defect_detected',
    defects: [],
    qualityGrade: 'Grade A',
    operatorNotes: "Export-grade pure natural flax linen roll passed all QC thresholds."
  }
];
