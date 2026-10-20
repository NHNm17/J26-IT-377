export type FabricType = 
  | 'Pure Natural Flax Linen' 
  | 'Belgian Slub Linen' 
  | 'Washed Organic Linen' 
  | 'Fine Bleached Linen' 
  | 'Heavyweight Linen Canvas' 
  | 'Herringbone Linen' 
  | 'Raw Ecru Linen'
  | 'Irish Table Linen'
  | 'Linen'
  | 'Cotton'
  | 'Cotton Poly Blend'
  | 'Polyester'
  | 'Silk';

export type DefectType = 'hole' | 'tear' | 'stain' | 'wrinkle' | 'weaving_defect';

export type DefectStatus = 'no_defect_detected' | 'defect_detected' | 'defect_result_unavailable' | 'pending';

export type QualityGrade = 'Grade A' | 'Grade B' | 'Reject' | 'Pending Review';

export interface OpticalTCS3200 {
  red: number;
  green: number;
  blue: number;
  clear: number;
  dominantColorHex: string;
}

export interface CapacitanceFDC1004 {
  ch1_pf: number;
  status: 'connected' | 'not_connected';
}

export interface AmbientDHT11 {
  temperatureC: number;
  humidityPercent: number;
}

export interface DefectItem {
  id: string;
  type: DefectType;
  label: string;
  confidence?: number; // strictly only if supplied by model
  boundingBox?: {
    x: number; // percentage (0 - 100)
    y: number; // percentage (0 - 100)
    width: number; // percentage
    height: number; // percentage
  };
  severity: 'low' | 'medium' | 'high';
}

export interface AIClassificationResult {
  predictedFabricType?: FabricType;
  confidence?: number; // strictly only if supplied by model
  status: 'completed' | 'pending' | 'unavailable';
}

export interface InspectionRecord {
  sampleId: string;
  timestamp: string; // ISO 8601 string
  imageUrl?: string;
  opticalSensor?: OpticalTCS3200;
  capacitanceSensor?: CapacitanceFDC1004;
  ambientSensor?: AmbientDHT11;
  aiClassification?: AIClassificationResult;
  defectStatus: DefectStatus;
  defects: DefectItem[];
  qualityGrade: QualityGrade;
  batchNumber: string;
  operatorNotes?: string;
}

export interface DashboardMetrics {
  totalProcessed: number;
  totalClassified: number;
  totalFlaggedDefects: number;
  totalAwaitingResults: number;
  classificationRate: number; // percentage
  defectRate: number; // percentage
}
