import {
  GharyzehDataRaw,
  CharacterUIData,
  StrategyResultRaw,
  Kpi,
  Holding,
  Factor,
  BacktestDataPoint,
  RebalanceHistoryEvent,
} from '../types/gharyzeh';

const characterStaticData: Record<string, Omit<CharacterUIData, keyof ReturnType<typeof transformDynamicData>>> = {
  Defensive: {
    name: 'زره‌پوش',
    type: 'استراتژی دفاعی',
    tagline: 'سپری هوشمند برای استقامت و پیروزی در بلندمدت.',
    story: 'در این جنگل، بسیاری با سرعت حرکت می‌کنند، اما فقط قدرتمندترین‌ها دوام می‌آورند. "زره‌پوش" یک افسانه زنده است؛ لاک‌پشتی با سپری چنان سخت و نفوذناپذیر که گویی از دل خود کوهستان تراشیده شده. او در برابر طوفان‌ها خم به ابرو نمی‌آورد و استوار می‌ایستد. فلسفه او ساده است: اول بمان، بعد برنده شو.',
    suggestion: 'این استراتژی برای کسانی مناسب است که حفظ سرمایه و رشد پایدار در بلندمدت را در اولویت قرار می‌دهند.',
    image: '/images/turtle.png',
    theme: {
      primary: '#556B2F',
      secondary: '#2ECC71',
      highlight: '#2ECC71',
    },
    profile: {
      endurance: 90,
      strategy: 60,
      boldness: 20,
    },
  },
  Balanced: {
    name: 'فرمانده',
    type: 'استراتژی متعادل',
    tagline: 'هنر جنگ؛ استراتژی پویا برای تسلط بر میدان نبرد.',
    story: 'جنگل، گاه آفتابی و پر از فرصت است، گاه طوفانی و غیرقابل پیش‌بینی. "فرمانده" استادی است که هر دو روی این سکه را می‌شناسد. او با قدرت یک شکارچی در روز حمله می‌کند، اما با صبر یک شبح در شب کمین می‌کند. او با جریان جنگل حرکت می‌کند، چون می‌داند پیروزی واقعی نه در تقابل با طوفان، که در هماهنگی با قوانین قدرتمند آن است.',
    suggestion: 'ایده‌آل برای سرمایه‌گذارانی که به دنبال تعادل بین رشد و مدیریت ریسک هستند و با شرایط بازار سازگار می‌شوند.',
    image: '/images/wolf.png',
    theme: {
      primary: '#5D6D7E',
      secondary: '#5DADE2',
      highlight: '#5DADE2',
    },
    profile: {
      endurance: 65,
      strategy: 90,
      boldness: 65,
    },
  },
  Aggressive: {
    name: 'تکاور',
    type: 'استراتژی تهاجمی',
    tagline: 'شکار فرصت‌های بزرگ؛ رویکردی جسورانه برای کسب بیشترین سود.',
    story: 'در بلندای آسمان، جایی که دیگران جز ابر چیزی نمی‌بینند، "تکاور" قلمرو خود را رصد می‌کند. او یک شکارچی فرصت‌هاست؛ با چشمانی که کوچکترین حرکت را در پایین‌دست می‌بیند. او منتظر نمی‌ماند، بلکه به دنبال لحظه مناسب می‌گردد. با یک شیرجه بی‌صدا و دقتی بی‌نقص، ضربه خود را می‌زند و پیش از آنکه کسی متوجه شود، پیروزمندانه به جایگاه خود بازمی‌گردد.',
    suggestion: 'مناسب برای سرمایه‌گذاران با تحمل ریسک بالا که با هدف کسب حداکثر بازده از فرصت‌های بازار، سرمایه‌گذاری می‌کنند.',
    image: '/images/eagle.png',
    theme: {
      primary: '#F39C12',
      secondary: '#F1C40F',
      highlight: '#F1C40F',
    },
    profile: {
      endurance: 15,
      strategy: 55,
      boldness: 95,
    },
  },
};

// Helper function to parse percentage strings
const parsePercentage = (s: string): number => parseFloat(s.replace('%', ''));

function transformDynamicData(rawStrategy: StrategyResultRaw, strategyName: string) {
  const factors: Factor[] = Object.entries(rawStrategy.strategy_configuration).map(
    ([name, value]) => ({
      name,
      value: (typeof value === 'string' ? parseFloat(value) : value) * 100,
    })
  );

  const holdings: Holding[] = Object.entries(rawStrategy.optimal_weights)
    .filter(([, weight]) => weight > 0)
    .map(([ticker, weight]) => ({
      ticker,
      name: ticker, // Assuming ticker is the name for now
      weight: parseFloat((weight * 100).toFixed(2)),
    }))
    .sort((a, b) => b.weight - a.weight);

  const kpis: Kpi[] = [
    { name: 'Total Return', value: rawStrategy.performance_summary['Total Return'], tooltip: 'Total Return' },
    { name: 'Annualized Return', value: rawStrategy.performance_summary['Annualized Return'], tooltip: 'Annualized Return (CAGR)' },
    { name: 'Sharpe Ratio', value: rawStrategy.performance_summary['Sharpe Ratio'], tooltip: 'Sharpe Ratio' },
    { name: 'Annualized Volatility', value: rawStrategy.performance_summary['Annualized Volatility'], tooltip: 'Annualized Volatility' },
  ];

  const rebalanceHistory: RebalanceHistoryEvent[] = rawStrategy.transaction_analysis.rebalance_history.map(event => ({
    date: event.date,
    bought: Object.keys(event.bought),
    sold: Object.keys(event.sold),
  }));

  const backtestData: BacktestDataPoint[] = rawStrategy.backtest_data.dates.map((date, index) => ({
    date,
    value: rawStrategy.backtest_data.strategy_values[index],
    benchmarkValue: rawStrategy.backtest_data.benchmark_values[index],
  }));

  return {
    strategyName: strategyName,
    strategyDescription: `Description for ${strategyName}`, // Placeholder
    tickers: [], // Not available in the new structure
    rebalanceFrequency: 'Quarterly', // Not available in the new structure
    timePeriod: '2020-07-14 - 2025-07-14', // Placeholder
    kpis,
    holdings,
    factors,
    backtestData,
    rebalanceHistory,
    annualTurnover: parsePercentage(rawStrategy.transaction_analysis.annual_turnover),
    estimatedTotalCost: parseFloat(rawStrategy.transaction_analysis.estimated_total_cost),
  };
}

export function transformRawDataToUIData(rawData: GharyzehDataRaw): CharacterUIData[] {
  const strategyKeys = ['Defensive', 'Balanced', 'Aggressive'] as const;
  
  return strategyKeys.map(key => {
    const rawStrategy = rawData[key];
    if (!rawStrategy) {
      throw new Error(`Strategy data for "${key}" not found in raw data.`);
    }
    
    const staticData = characterStaticData[key];
    const dynamicData = transformDynamicData(rawStrategy, key);

    return {
      ...staticData,
      ...dynamicData,
    };
  });
}
