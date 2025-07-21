// Raw data interfaces from JSON
export interface StrategyConfigRaw {
  strategy_name: string;
  strategy_description: string;
  tickers: string[];
  rebalance_frequency: string;
  start_date: string;
  end_date: string;
}

export interface PerformanceSummaryRaw {
  "Total Return": string;
  "Annualized Volatility": string;
  "Annualized Return": string;
  "Sharpe Ratio": string;
}

export interface RebalanceEventRaw {
  date: string;
  sold: Record<string, string>;
  bought: Record<string, string>;
  cost?: number; // Optional as it's not always present
}

export interface BacktestDataRaw {
  dates: string[];
  strategy_values: number[];
  benchmark_values: number[];
}

export interface StrategyResultRaw {
  strategy_configuration: Record<string, number | string>;
  optimal_weights: Record<string, number>;
  performance_summary: PerformanceSummaryRaw;
  backtest_data: BacktestDataRaw;
  transaction_analysis: {
    annual_turnover: string;
    estimated_total_cost: string;
    rebalance_history: RebalanceEventRaw[];
  };
}

export type GharyzehDataRaw = Record<"Defensive" | "Balanced" | "Aggressive", StrategyResultRaw>;

// UI-ready data interfaces
export interface Holding {
  ticker: string;
  weight: number;
  name: string;
}

export interface Factor {
  name: string;
  value: number;
}

export interface Kpi {
  name: string;
  value: string;
  tooltip: string;
}

export interface BacktestDataPoint {
  date: string;
  value: number;
  benchmarkValue: number;
}

export interface RebalanceHistoryEvent {
  date: string;
  bought: string[];
  sold: string[];
}

export interface CharacterUIData {
  // Static data
  name: string;
  type: string;
  tagline: string;
  story: string;
  suggestion: string;
  image: string;
  theme: {
    primary: string;
    secondary: string;
    highlight: string;
  };
  profile: {
    endurance: number;
    strategy: number;
    boldness: number;
  };

  // Dynamic data
  strategyName: string;
  strategyDescription: string;
  tickers: string[];
  rebalanceFrequency: string;
  timePeriod: string;
  kpis: Kpi[];
  holdings: Holding[];
  factors: Factor[];
  backtestData: BacktestDataPoint[];
  rebalanceHistory: RebalanceHistoryEvent[];
  annualTurnover: number;
  estimatedTotalCost: number;
}
