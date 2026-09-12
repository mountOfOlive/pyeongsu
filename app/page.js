'use client'

import { useState } from 'react'

const PER_PYEONG = 3.305785

function toNum(s) {
  if (s === '' || s == null) return null
  const n = parseFloat(s)
  return isNaN(n) ? null : n
}

function fmt(n) {
  return n === null ? '' : n.toFixed(2)
}

const inputClass =
  'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent'

const labelClass = 'block text-sm text-gray-500 mb-1'

export default function Home() {
  const [pyeong, setPyeong] = useState('')
  const [sqm, setSqm] = useState('')

  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')

  const [supplyArea, setSupplyArea] = useState('')
  const [exclusiveRatio, setExclusiveRatio] = useState('')

  function handlePyeongChange(e) {
    const val = e.target.value
    setPyeong(val)
    const n = toNum(val)
    setSqm(n !== null ? fmt(n * PER_PYEONG) : '')
  }

  function handleSqmChange(e) {
    const val = e.target.value
    setSqm(val)
    const n = toNum(val)
    setPyeong(n !== null ? fmt(n / PER_PYEONG) : '')
  }

  const w = toNum(width)
  const h = toNum(height)
  const area = w !== null && h !== null ? w * h : null
  const areaPyeong = area !== null ? area / PER_PYEONG : null

  const supply = toNum(supplyArea)
  const ratio = toNum(exclusiveRatio)
  const ratioOutOfRange = ratio !== null && (ratio < 0 || ratio > 100)
  const exclusive = supply !== null && ratio !== null && !ratioOutOfRange ? supply * (ratio / 100) : null
  const exclusivePyeong = exclusive !== null ? exclusive / PER_PYEONG : null

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-lg mx-auto space-y-5">
        <h1 className="text-2xl font-bold text-center text-gray-800 pb-1">평수 계산기</h1>

        {/* 섹션 1: 평 ↔ 제곱미터 */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-gray-700 mb-4">평 ↔ 제곱미터 변환</h2>
          <div className="space-y-2">
            <div>
              <label className={labelClass}>평 (坪)</label>
              <input
                type="number"
                min="0"
                step="any"
                value={pyeong}
                onChange={handlePyeongChange}
                placeholder="평 입력"
                className={inputClass}
              />
            </div>
            <div className="flex items-center justify-center text-gray-300 text-xl py-1">↕</div>
            <div>
              <label className={labelClass}>제곱미터 (㎡)</label>
              <input
                type="number"
                min="0"
                step="any"
                value={sqm}
                onChange={handleSqmChange}
                placeholder="㎡ 입력"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* 섹션 2: 가로×세로 */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-gray-700 mb-4">가로 × 세로 면적 계산</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className={labelClass}>가로 (m)</label>
              <input
                type="number"
                min="0"
                step="any"
                value={width}
                onChange={e => setWidth(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>세로 (m)</label>
              <input
                type="number"
                min="0"
                step="any"
                value={height}
                onChange={e => setHeight(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
          </div>
          {area !== null && (
            <div className="bg-blue-50 rounded-xl px-4 py-3 space-y-1">
              <p className="text-sm text-blue-700">
                면적 <span className="font-semibold">{fmt(area)} ㎡</span>
              </p>
              <p className="text-sm text-blue-700">
                평수 <span className="font-semibold">{fmt(areaPyeong)} 평</span>
              </p>
            </div>
          )}
        </section>

        {/* 섹션 3: 전용면적 */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-gray-700 mb-4">전용면적 계산</h2>
          <div className="space-y-3 mb-4">
            <div>
              <label className={labelClass}>공급면적 (㎡)</label>
              <input
                type="number"
                min="0"
                step="any"
                value={supplyArea}
                onChange={e => setSupplyArea(e.target.value)}
                placeholder="공급면적 입력"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>전용률 (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="any"
                value={exclusiveRatio}
                onChange={e => setExclusiveRatio(e.target.value)}
                placeholder="예: 75"
                className={inputClass}
              />
            </div>
          </div>
          {ratioOutOfRange && (
            <div className="bg-red-50 rounded-xl px-4 py-3">
              <p className="text-sm text-red-600">전용률은 0~100% 사이로 입력해주세요.</p>
            </div>
          )}
          {exclusive !== null && (
            <div className="bg-green-50 rounded-xl px-4 py-3 space-y-1">
              <p className="text-sm text-green-700">
                전용면적 <span className="font-semibold">{fmt(exclusive)} ㎡</span>
              </p>
              <p className="text-sm text-green-700">
                평수 <span className="font-semibold">{fmt(exclusivePyeong)} 평</span>
              </p>
            </div>
          )}
        </section>

        {/* 환산표 */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-gray-700 mb-4">자주 찾는 평수 환산표</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left font-medium text-gray-500 pb-2">평 (坪)</th>
                <th className="text-right font-medium text-gray-500 pb-2">제곱미터 (㎡)</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 11 }, (_, i) => (i + 2) * 5).map(p => (
                <tr key={p} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 text-gray-700 font-medium">{p}평</td>
                  <td className="py-2 text-right text-gray-600">{fmt(p * PER_PYEONG)} ㎡</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <p className="text-center text-xs text-gray-400 pb-4">1평 = 3.305785 ㎡</p>
      </div>
    </main>
  )
}
