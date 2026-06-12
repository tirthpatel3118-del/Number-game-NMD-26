import React, { useState } from 'react';
import { BookOpen, Binary, Compass, Cpu, Network, ArrowRight, Star } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';

type SectionKey = 'binary_search' | 'probability' | 'information_theory' | 'cs_apps';

export const AboutMath: React.FC = () => {
  const [activeSec, setActiveSec] = useState<SectionKey>('binary_search');

  const topics = [
    { key: 'binary_search' as const, label: 'Binary Search', icon: Binary },
    { key: 'probability' as const, label: 'Probability', icon: Compass },
    { key: 'information_theory' as const, label: 'Information Theory', icon: Network },
    { key: 'cs_apps' as const, label: 'Computer Science Apps', icon: Cpu },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 font-sans">
      <PageHeader
        title="About Mathematics"
        subtitle="Exploring the rich heritage of numerical systems. Dedicating celebrations to National Mathematics Day."
        icon={<BookOpen className="w-6 h-6" />}
      />

      {/* Grid selector buttons for topic tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {topics.map((t) => {
          const Icon = t.icon;
          const isActive = activeSec === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActiveSec(t.key)}
              className={`
                p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 group
                ${
                  isActive
                    ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 font-bold shadow-md'
                    : 'border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400'
                }
              `}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'scale-110 text-indigo-650' : 'group-hover:scale-105'}`} />
              <span className="text-xs md:text-sm">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* BINARY SEARCH SECTION */}
      {activeSec === 'binary_search' && (
        <div className="space-y-6 animate-fade-in">
          <Card mathTheme>
            <div className="space-y-4">
              <Badge variant="teal">Algorithm Profile</Badge>
              <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
                Binary Search: The Power of Logarithmic Scaling
              </h2>
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  <strong>Definition:</strong> Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.
                </p>
                <div className="p-4 bg-slate-900 text-emerald-400 font-mono rounded-xl text-xs space-y-1">
                  <div>// Walkthrough Example: Find 37 in range [1-100]</div>
                  <div>Step 1: Mid = floor((1+100)/2) = 50. Is 37 &gt; 50? No. bounds → [1-50]</div>
                  <div>Step 2: Mid = floor((1+50)/2) = 25. Is 37 &gt; 25? Yes. bounds → [26-50]</div>
                  <div>Step 3: Mid = floor((26+50)/2) = 38. Is 37 &gt; 38? No. bounds → [26-38]</div>
                  <div>Step 4: Mid = floor((26+38)/2) = 32. Is 37 &gt; 32? Yes. bounds → [33-38]</div>
                  <div>Step 5: Mid = floor((33+38)/2) = 35. Is 37 &gt; 35? Yes. bounds → [36-38]</div>
                  <div>Step 6: Mid = floor((36+38)/2) = 37. Is 37 &gt; 37? No. bounds → [36-37]</div>
                  <div>Step 7: Mid = floor((36+37)/2) = 36. Is 37 &gt; 36? Yes. bounds → [37-37]. Identified!</div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Advantages" subtitle="Why it outperforms linear scans" className="h-full">
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-1.5">
                  <ArrowRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span><strong>Speed:</strong> Executes in O(log N) time rather than linear O(N) scanning.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <ArrowRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span><strong>Scale-Friendly:</strong> An array of 1,000,000 elements requires only 20 questions to resolve.</span>
                </li>
              </ul>
            </Card>

            <Card title="Real-World Applications" subtitle="Where binary systems reside" className="h-full">
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-650 dark:text-slate-400">
                <li className="flex items-start gap-1.5">
                  <ArrowRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span><strong>Dictionaries:</strong> Alphabetic search indexes in glossary books.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <ArrowRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span><strong>Debugging:</strong> git bisect splits commit history to isolate bugs.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      )}

      {/* PROBABILITY SECTION */}
      {activeSec === 'probability' && (
        <div className="space-y-6 animate-fade-in">
          <Card mathTheme>
            <div className="space-y-4">
              <Badge variant="teal">Stochastics</Badge>
              <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
                Probability: The Mathematics of Uncertainty
              </h2>
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                <p>
                  <strong>Definition:</strong> Probability is the branch of mathematics concerning numerical descriptions of how likely an event is to occur, or how likely it is that a proposition is true. The probability of an event is a number between 0 and 1.
                </p>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-2">
                  <span className="font-bold text-slate-700 dark:text-slate-350 block">Classic Examples:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-xs">
                    <li><strong>Fair Coin:</strong> Probability of Heads = 0.5.</li>
                    <li><strong>Standard Die:</strong> Probability of rolling a 4 = 1/6 ≈ 16.7%.</li>
                    <li><strong>Monty Hall Decision:</strong> Switching doors raises your winning odds to 2/3 (66.7%).</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Applications" subtitle="Uncertainty in science and industry" mathTheme>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-indigo-650 dark:text-indigo-400 block mb-1">Risk Modeling</span>
                Insurers compute premium pricing scales by analyzing death and natural disaster probability frequencies.
              </div>
              <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-amber-500 block mb-1">Weather Forecasting</span>
                Meteorological grids run simulations to calculate precipitation chances (e.g. 70% rain probability).
              </div>
              <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-emerald-500 block mb-1">Quantum Physics</span>
                Subatomic particles are modeled using wavefunctions expressing spatial presence probabilities.
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* INFORMATION THEORY SECTION */}
      {activeSec === 'information_theory' && (
        <div className="space-y-6 animate-fade-in">
          <Card mathTheme>
            <div className="space-y-4">
              <Badge variant="teal">Entropy & Signals</Badge>
              <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
                Information Theory: Quantifying Knowledge
              </h2>
              <div className="space-y-3 text-sm text-slate-655 dark:text-slate-400 leading-relaxed">
                <p>
                  <strong>Basic Explanation:</strong> Founded by Claude Shannon in 1948, Information Theory is the mathematical study of the coding of information in the form of sequences of symbols, and the speed at which information can be transmitted. The fundamental metric of information is <strong>entropy</strong>, measuring systemic uncertainty.
                </p>
                
                <div className="p-4 rounded-xl bg-slate-900 text-amber-400 font-mono text-center font-bold text-sm border border-slate-800 shadow-inner">
                  Shannon Entropy Formula: H(X) = - ∑ P(xᵢ) log₂ P(xᵢ)
                </div>

                <div className="p-4 bg-slate-50/80 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-2">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-xs">Connection to Binary Search:</span>
                  <p className="text-xs">
                    In a guessing game of numbers 1-100, our uncertainty (entropy) starts at log₂ 100 ≈ 6.64 bits. By asking an optimal question that cuts the remaining possibilities in half, we receive exactly <strong>1 bit of information</strong> per question (Yes/No response resolves 50% probability).
                  </p>
                  <p className="text-xs">
                    Thus, 7 binary questions provide up to 7 bits of informational capacity, which is mathematically sufficient to reduce the entropy of a 100-number search space to 0 bits (absolute certainty).
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* CS APPLICATIONS SECTION */}
      {activeSec === 'cs_apps' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          <Card 
            title={
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-indigo-500" /> Search Engines
              </span>
            }
            subtitle="Web indexes"
            mathTheme
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Google indexes billions of webpages. Finding queries instantly is only possible because they store index entries in sorted indexes and run variations of binary tree retrievals.
            </p>
          </Card>

          <Card 
            title={
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" /> Database Indexes
              </span>
            }
            subtitle="B-Trees & SQL"
            mathTheme
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Modern DBMS structures use B-Trees and binary tree arrays. Instead of scanning millions of accounts linearly, databases search indexes logarithmically to yield instant queries.
            </p>
          </Card>

          <Card 
            title={
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-emerald-500" /> Artificial Intelligence
              </span>
            }
            subtitle="Decision boundaries"
            mathTheme
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Machine Learning classifiers (like Decision Trees or Random Forests) split feature spaces at optimal thresholds using information gain criteria, mirroring binary tree splits.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};
