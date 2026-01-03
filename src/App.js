import React, { useState } from 'react';

// 这里定义了你说的“深水区”留学项目的关键节点
const MILESTONES = [
  { id: 1, label: "协议启动 (Initial Escrow)", desc: "资金已锁定在 Casper 智能合约，中介不可随意动用" },
  { id: 2, label: "背景提升/申请递交", desc: "中介上传申请证明，经过学生确认后解锁 20% 服务费" },
  { id: 3, label: "录取出结果 (Offer Issued)", desc: "拿到正式 Offer，解锁 50% 费用。若无 Offer，协议准备退款" },
  { id: 4, label: "最终认证 (Final Authentication)", desc: "留服中心认证通过，协议完成，解锁尾款" }
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRefunded, setIsRefunded] = useState(false);

  const handleNext = () => { if (currentStep < 4) setCurrentStep(currentStep + 1); };
  const triggerRefund = () => { setIsRefunded(true); setCurrentStep(0); };

  return (
    <div style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', padding: '40px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <header style={{ maxWidth: '900px', margin: '0 auto', borderBottom: '1px solid #1e293b', paddingBottom: '20px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ color: '#38bdf8', fontSize: '32px', margin: '0 0 10px 0' }}>ScholarGuard Protocol 🛡️</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>针对“项目制留学”的抗跑路资金托管系统 (Based on Casper Network)</p>
        </div>
        <div style={{ textAlign: 'right', fontSize: '12px', color: '#475569' }}>
          Hacker Role: Internet Sales Veteran 转 Web3 Builder
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        
        {/* 左侧：里程碑展示 */}
        <section style={{ backgroundColor: '#0f172a', padding: '30px', borderRadius: '24px', border: '1px solid #1e293b', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
          <h3 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            项目执行状态: {isRefunded ? <span style={{color:'#f43f5e'}}>● 已触发自动退款</span> : <span style={{color:'#22c55e'}}>● 资金受合约保护中</span>}
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {MILESTONES.map((m) => (
              <div key={m.id} style={{ 
                padding: '20px', borderRadius: '16px', border: '2px solid',
                backgroundColor: currentStep >= m.id ? '#0ea5e911' : '#1e293b44',
                borderColor: currentStep >= m.id ? '#38bdf8' : '#1e293b',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '18px', color: currentStep >= m.id ? '#38bdf8' : '#64748b' }}>
                  {m.id}. {m.label} {currentStep >= m.id && "✅"}
                </div>
                <div style={{ fontSize: '14px', color: '#94a3b8', marginTop: '5px' }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 右侧：控制台 */}
        <section>
          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '24px', border: '1px solid #334155' }}>
            <h4 style={{ marginTop: 0 }}>协议控制台 (模拟合约交互)</h4>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
              作为留学生，你可以根据中介提供的证据，在链上确认里程碑。如果中介失联或认证失败，你可以触发退款协议。
            </p>
            
            {!isRefunded && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                <button onClick={handleNext} style={{ width: '100%', padding: '14px', backgroundColor: '#38bdf8', color: '#020617', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  确认当前进度 (解锁阶段金)
                </button>
                <button onClick={triggerRefund} style={{ width: '100%', padding: '14px', backgroundColor: 'transparent', border: '1px solid #f43f5e', color: '#f43f5e', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  中介违约/认证失败 (申请退款)
                </button>
              </div>
            )}
            
            {isRefunded && (
              <div style={{ marginTop: '20px' }}>
                <div style={{ padding: '15px', backgroundColor: '#450a0a', border: '1px solid #f43f5e', borderRadius: '12px', color: '#fca5a5', fontSize: '13px', marginBottom: '15px' }}>
                  检测到合约异常或认证失败，剩余 80% 资金已原路退回您的钱包。
                </div>
                <button onClick={() => window.location.reload()} style={{ width: '100%', padding: '12px', backgroundColor: '#334155', border: 'none', color: 'white', borderRadius: '12px', cursor: 'pointer' }}>
                  重新演示协议
                </button>
              </div>
            )}
          </div>

          <div style={{ marginTop: '20px', padding: '20px', fontSize: '12px', color: '#475569', backgroundColor: '#0f172a', borderRadius: '16px', border: '1px dashed #334155' }}>
             <strong>技术备注:</strong> 此 Demo 演示了 Casper 链上的线性解锁逻辑。即使中介公司注销（卷款跑路），锁定在智能合约中的资金依然受学生私钥控制。
          </div>
        </section>
      </main>

      <footer style={{ marginTop: '60px', textAlign: 'center', color: '#4b5563', fontSize: '14px' }}>
        Built by a Veteran Internet Salesman for Casper Hackathon 2026
      </footer>
    </div>
  );
}

export default App;