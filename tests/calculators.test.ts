import { describe, it, expect } from 'vitest';
import { MANDATORY_COURSES } from '../src/components/curriculum/curriculumData';
import { DISCIPLINAS_GRAFO } from '../src/components/curriculum/curriculumGraphData';

describe('Curriculum & Hours Invariants', () => {
  it('garante exatamente 27 disciplinas obrigatórias', () => {
    expect(MANDATORY_COURSES).toHaveLength(27);
    expect(Object.keys(DISCIPLINAS_GRAFO)).toHaveLength(27);
  });

  it('garante exatamente 1.860h de disciplinas obrigatórias e estágios', () => {
    const totalHours = MANDATORY_COURSES.reduce((acc, c) => acc + c.ch, 0);
    expect(totalHours).toBe(1860);

    const totalGrafoHours = Object.values(DISCIPLINAS_GRAFO).reduce((acc, c) => acc + c.ch, 0);
    expect(totalGrafoHours).toBe(1860);
  });

  it('garante que ECN 044 possui trava formal em ECN 140 no Grafo', () => {
    const ecn044 = DISCIPLINAS_GRAFO.ECN044;
    expect(ecn044).toBeDefined();
    expect(ecn044.isFormalLock).toBe(true);
    expect(ecn044.formalReqs).toContain('ECN140');

    const ecn140 = DISCIPLINAS_GRAFO.ECN140;
    expect(ecn140).toBeDefined();
    expect(ecn140.isKey).toBe(true);
    expect(ecn140.formalUnlocks).toContain('ECN044');
  });

  it('garante distribuição correta pelas 10 colunas de semestres', () => {
    const periods = Object.values(DISCIPLINAS_GRAFO).map((d) => d.period);
    const minPeriod = Math.min(...periods);
    const maxPeriod = Math.max(...periods);
    expect(minPeriod).toBe(1);
    expect(maxPeriod).toBe(10);
  });

  it('garante que Estágio A tem 180h e Estágio B tem 120h (Art. 41 = 300h)', () => {
    const estagioA = MANDATORY_COURSES.find((c) => c.code === 'DCP 135');
    const estagioB = MANDATORY_COURSES.find((c) => c.code === 'DCP 136');
    expect(estagioA?.ch).toBe(180);
    expect(estagioB?.ch).toBe(120);
    expect((estagioA?.ch || 0) + (estagioB?.ch || 0)).toBe(300);
  });

  it('garante que TCC A tem 60h e TCC B tem 120h (180h total)', () => {
    const tccA = MANDATORY_COURSES.find((c) => c.code === 'DCP 089');
    const tccB = MANDATORY_COURSES.find((c) => c.code === 'DCP 137');
    expect(tccA?.ch).toBe(60);
    expect(tccB?.ch).toBe(120);
    expect((tccA?.ch || 0) + (tccB?.ch || 0)).toBe(180);
  });
});
