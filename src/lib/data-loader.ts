import { GharyzehDataRaw } from '../types/gharyzeh';

export async function loadGharyzehData(): Promise<GharyzehDataRaw> {
  try {
    const response = await fetch('/data/final_results.json');
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data: GharyzehDataRaw = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load Gharyzeh data:', error);
    throw new Error('Could not fetch or parse Gharyzeh data.');
  }
}
