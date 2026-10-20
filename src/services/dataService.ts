import { INITIAL_FABRIC_RECORDS } from '../data/fabricData';
import { 
  InspectionRecord, 
  DashboardMetrics, 
  FabricType, 
  DefectStatus 
} from '../types/inspection';

class FabricDataService {
  private records: InspectionRecord[] = [...INITIAL_FABRIC_RECORDS];

  public getAllRecords(): InspectionRecord[] {
    return [...this.records];
  }

  public getRecentRecords(limit: number = 6): InspectionRecord[] {
    return [...this.records]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  public getRecordById(id: string): InspectionRecord | undefined {
    return this.records.find(r => r.sampleId.toLowerCase() === id.toLowerCase());
  }

  /**
   * Calculates dashboard metrics strictly from available loaded records.
   * Does NOT invent totals.
   */
  public calculateMetrics(): DashboardMetrics {
    const totalProcessed = this.records.length;
    if (totalProcessed === 0) {
      return {
        totalProcessed: 0,
        totalClassified: 0,
        totalFlaggedDefects: 0,
        totalAwaitingResults: 0,
        classificationRate: 0,
        defectRate: 0
      };
    }

    const totalClassified = this.records.filter(
      r => r.aiClassification && r.aiClassification.status === 'completed' && r.aiClassification.predictedFabricType
    ).length;

    const totalFlaggedDefects = this.records.filter(
      r => r.defectStatus === 'defect_detected'
    ).length;

    const totalAwaitingResults = this.records.filter(
      r => r.defectStatus === 'pending' || 
           r.aiClassification?.status === 'pending' || 
           r.defectStatus === 'defect_result_unavailable'
    ).length;

    const classificationRate = Math.round((totalClassified / totalProcessed) * 100);
    const defectRate = Math.round((totalFlaggedDefects / totalProcessed) * 100);

    return {
      totalProcessed,
      totalClassified,
      totalFlaggedDefects,
      totalAwaitingResults,
      classificationRate,
      defectRate
    };
  }

  /**
   * Calculates the exact counts and percentages per fabric type from actual records.
   */
  public getFabricDistribution(): { type: string; count: number; percentage: number; color: string }[] {
    const colorMap: Record<string, string> = {
      'Pure Natural Flax Linen': '#10b981', // emerald
      'Belgian Slub Linen': '#3b82f6', // stitch blue
      'Washed Organic Linen': '#06b6d4', // cyan
      'Fine Bleached Linen': '#a855f7', // purple
      'Heavyweight Linen Canvas': '#f59e0b', // amber
      'Herringbone Linen': '#6366f1', // indigo
      'Raw Ecru Linen': '#ec4899', // pink
      'Irish Table Linen': '#14b8a6', // teal
      'Linen': '#10b981',
      'Cotton': '#f59e0b', // amber
      'Cotton Poly Blend': '#3b82f6', // stitch blue
      'Polyester': '#06b6d4', // cyan
      'Silk': '#a855f7', // purple
      'Unclassified': '#94a3b8' // slate
    };

    const counts: Record<string, number> = {};

    this.records.forEach(r => {
      const type = (r.aiClassification?.status === 'completed' && r.aiClassification.predictedFabricType) 
        ? r.aiClassification.predictedFabricType 
        : 'Unclassified';
      counts[type] = (counts[type] || 0) + 1;
    });

    const total = this.records.length || 1;

    return Object.entries(counts).map(([type, count]) => ({
      type,
      count,
      percentage: Math.round((count / total) * 100),
      color: colorMap[type] || '#64748b'
    })).sort((a, b) => b.count - a.count);
  }

  /**
   * Filter records based on user search parameters.
   */
  public filterRecords(params: {
    search?: string;
    status?: DefectStatus | 'all';
    fabricType?: FabricType | 'all';
  }): InspectionRecord[] {
    return this.records.filter(record => {
      // Search term
      if (params.search) {
        const query = params.search.toLowerCase();
        const matchesId = record.sampleId.toLowerCase().includes(query);
        const matchesBatch = record.batchNumber.toLowerCase().includes(query);
        const matchesFabric = record.aiClassification?.predictedFabricType?.toLowerCase().includes(query);
        if (!matchesId && !matchesBatch && !matchesFabric) return false;
      }

      // Status filter
      if (params.status && params.status !== 'all') {
        if (record.defectStatus !== params.status) return false;
      }

      // Fabric Type filter
      if (params.fabricType && params.fabricType !== 'all') {
        if (record.aiClassification?.predictedFabricType !== params.fabricType) return false;
      }

      return true;
    });
  }
}

export const dataService = new FabricDataService();
