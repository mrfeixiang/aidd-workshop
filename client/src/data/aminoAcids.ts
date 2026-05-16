export type AminoAcidType = "nonpolar" | "polar" | "positive" | "negative";

export interface Atom {
  element: "C" | "N" | "O" | "S";
  pos: [number, number, number];
}

export interface AminoAcid {
  name: string;
  abbrev: string;
  letter: string;
  type: AminoAcidType;
  codons: string[];
  atoms: Atom[];
  bonds: [number, number][];
}

export const ATOM_COLORS: Record<string, number> = {
  C: 0x2a2a2a,
  N: 0x3355ff,
  O: 0xff3333,
  S: 0xdddd00,
};

export const ATOM_RADII: Record<string, number> = {
  C: 0.3,
  N: 0.32,
  O: 0.32,
  S: 0.42,
};

export const TYPE_COLORS: Record<AminoAcidType, string> = {
  nonpolar: "#aaaaaa",
  polar: "#55cc55",
  positive: "#4488ff",
  negative: "#ff5555",
};

export const CODON_TABLE: Record<string, string> = {
  UUU: "PHE", UUC: "PHE",
  UUA: "LEU", UUG: "LEU", CUU: "LEU", CUC: "LEU", CUA: "LEU", CUG: "LEU",
  AUU: "ILE", AUC: "ILE", AUA: "ILE",
  AUG: "MET",
  GUU: "VAL", GUC: "VAL", GUA: "VAL", GUG: "VAL",
  UCU: "SER", UCC: "SER", UCA: "SER", UCG: "SER",
  CCU: "PRO", CCC: "PRO", CCA: "PRO", CCG: "PRO",
  ACU: "THR", ACC: "THR", ACA: "THR", ACG: "THR",
  GCU: "ALA", GCC: "ALA", GCA: "ALA", GCG: "ALA",
  UAU: "TYR", UAC: "TYR",
  UAA: "STOP", UAG: "STOP",
  CAU: "HIS", CAC: "HIS",
  CAA: "GLN", CAG: "GLN",
  AAU: "ASN", AAC: "ASN",
  AAA: "LYS", AAG: "LYS",
  GAU: "ASP", GAC: "ASP",
  GAA: "GLU", GAG: "GLU",
  UGU: "CYS", UGC: "CYS",
  UGA: "STOP",
  UGG: "TRP",
  CGU: "ARG", CGC: "ARG", CGA: "ARG", CGG: "ARG",
  AGU: "SER", AGC: "SER",
  AGA: "ARG", AGG: "ARG",
  GGU: "GLY", GGC: "GLY", GGA: "GLY", GGG: "GLY",
};

export function getCodonsFor(abbrev: string): string[] {
  return Object.entries(CODON_TABLE)
    .filter(([, aa]) => aa === abbrev)
    .map(([codon]) => codon);
}

// Backbone atoms shared by all amino acids (indices 0–3)
const BB: Atom[] = [
  { element: "N", pos: [-1.3, 0.4, 0.0] },  // 0: N
  { element: "C", pos: [0.0, 0.0, 0.0] },   // 1: Cα (origin)
  { element: "C", pos: [1.2, 0.6, 0.0] },   // 2: C'
  { element: "O", pos: [1.4, 1.8, 0.0] },   // 3: O
];
const BB_BONDS: [number, number][] = [[0, 1], [1, 2], [2, 3]];

export const AMINO_ACIDS: Record<string, AminoAcid> = {
  GLY: {
    name: "Glycine", abbrev: "GLY", letter: "G", type: "nonpolar",
    codons: getCodonsFor("GLY"),
    atoms: [...BB],
    bonds: [...BB_BONDS],
  },
  ALA: {
    name: "Alanine", abbrev: "ALA", letter: "A", type: "nonpolar",
    codons: getCodonsFor("ALA"),
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },  // 4: Cβ
    ],
    bonds: [...BB_BONDS, [1, 4]],
  },
  VAL: {
    name: "Valine", abbrev: "VAL", letter: "V", type: "nonpolar",
    codons: getCodonsFor("VAL"),
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },   // 4: Cβ
      { element: "C", pos: [-1.1, -2.5, 0.0] },  // 5: Cγ1
      { element: "C", pos: [1.1, -2.5, 0.0] },   // 6: Cγ2
    ],
    bonds: [...BB_BONDS, [1, 4], [4, 5], [4, 6]],
  },
  LEU: {
    name: "Leucine", abbrev: "LEU", letter: "L", type: "nonpolar",
    codons: getCodonsFor("LEU"),
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },    // 4: Cβ
      { element: "C", pos: [0.0, -2.6, 0.5] },    // 5: Cγ
      { element: "C", pos: [-1.1, -3.6, 0.3] },   // 6: Cδ1
      { element: "C", pos: [1.1, -3.6, 0.3] },    // 7: Cδ2
    ],
    bonds: [...BB_BONDS, [1, 4], [4, 5], [5, 6], [5, 7]],
  },
  ILE: {
    name: "Isoleucine", abbrev: "ILE", letter: "I", type: "nonpolar",
    codons: getCodonsFor("ILE"),
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },    // 4: Cβ
      { element: "C", pos: [-1.0, -2.5, 0.0] },   // 5: Cγ1
      { element: "C", pos: [0.8, -2.5, 0.8] },    // 6: Cγ2
      { element: "C", pos: [-1.0, -3.7, -0.3] },  // 7: Cδ1
    ],
    bonds: [...BB_BONDS, [1, 4], [4, 5], [4, 6], [5, 7]],
  },
  PRO: {
    name: "Proline", abbrev: "PRO", letter: "P", type: "nonpolar",
    codons: getCodonsFor("PRO"),
    atoms: [
      ...BB,
      { element: "C", pos: [-1.0, -1.0, 0.0] },   // 4: Cβ
      { element: "C", pos: [-2.3, -1.2, 0.0] },   // 5: Cγ
      { element: "C", pos: [-2.7, 0.1, 0.0] },    // 6: Cδ (closes ring back to N)
    ],
    bonds: [...BB_BONDS, [1, 4], [4, 5], [5, 6], [6, 0]],
  },
  PHE: {
    name: "Phenylalanine", abbrev: "PHE", letter: "F", type: "nonpolar",
    codons: getCodonsFor("PHE"),
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },    // 4: Cβ
      { element: "C", pos: [0.0, -2.6, 0.0] },    // 5: Cγ
      { element: "C", pos: [-1.1, -3.3, 0.0] },   // 6: Cδ1
      { element: "C", pos: [1.1, -3.3, 0.0] },    // 7: Cδ2
      { element: "C", pos: [-1.1, -4.6, 0.0] },   // 8: Cε1
      { element: "C", pos: [1.1, -4.6, 0.0] },    // 9: Cε2
      { element: "C", pos: [0.0, -5.3, 0.0] },    // 10: Cζ
    ],
    bonds: [...BB_BONDS, [1, 4], [4, 5], [5, 6], [5, 7], [6, 8], [7, 9], [8, 10], [9, 10]],
  },
  TRP: {
    name: "Tryptophan", abbrev: "TRP", letter: "W", type: "nonpolar",
    codons: getCodonsFor("TRP"),
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },    // 4: Cβ
      { element: "C", pos: [0.0, -2.6, 0.0] },    // 5: Cγ
      { element: "C", pos: [-1.0, -3.4, 0.0] },   // 6: Cδ1
      { element: "C", pos: [0.9, -3.4, 0.0] },    // 7: Cδ2
      { element: "N", pos: [-1.5, -4.5, 0.0] },   // 8: Nε1
      { element: "C", pos: [-0.5, -5.2, 0.0] },   // 9: Cε2 (shared)
      { element: "C", pos: [1.8, -4.4, 0.0] },    // 10: Cε3
      { element: "C", pos: [1.5, -5.6, 0.0] },    // 11: Cζ3
      { element: "C", pos: [0.3, -6.2, 0.0] },    // 12: Cη2
      { element: "C", pos: [-0.8, -5.5, 0.0] },   // 13: Cζ2
    ],
    bonds: [...BB_BONDS,
      [1, 4], [4, 5], [5, 6], [5, 7],
      [6, 8], [8, 9], [9, 13], [13, 12],
      [7, 10], [10, 11], [11, 12],
      [12, 13], [7, 9],
    ],
  },
  MET: {
    name: "Methionine", abbrev: "MET", letter: "M", type: "nonpolar",
    codons: ["AUG"],
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },    // 4: Cβ
      { element: "C", pos: [0.0, -2.6, 0.0] },    // 5: Cγ
      { element: "S", pos: [0.0, -4.0, 0.0] },    // 6: Sδ (sulfur!)
      { element: "C", pos: [0.0, -5.4, 0.0] },    // 7: Cε
    ],
    bonds: [...BB_BONDS, [1, 4], [4, 5], [5, 6], [6, 7]],
  },
  SER: {
    name: "Serine", abbrev: "SER", letter: "S", type: "polar",
    codons: getCodonsFor("SER"),
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },    // 4: Cβ
      { element: "O", pos: [0.0, -2.8, 0.0] },    // 5: Oγ
    ],
    bonds: [...BB_BONDS, [1, 4], [4, 5]],
  },
  THR: {
    name: "Threonine", abbrev: "THR", letter: "T", type: "polar",
    codons: getCodonsFor("THR"),
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },    // 4: Cβ
      { element: "O", pos: [-1.1, -2.4, 0.0] },   // 5: Oγ1
      { element: "C", pos: [1.0, -2.5, 0.0] },    // 6: Cγ2
    ],
    bonds: [...BB_BONDS, [1, 4], [4, 5], [4, 6]],
  },
  CYS: {
    name: "Cysteine", abbrev: "CYS", letter: "C", type: "polar",
    codons: getCodonsFor("CYS"),
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },    // 4: Cβ
      { element: "S", pos: [0.0, -3.1, 0.0] },    // 5: Sγ (thiol sulfur)
    ],
    bonds: [...BB_BONDS, [1, 4], [4, 5]],
  },
  TYR: {
    name: "Tyrosine", abbrev: "TYR", letter: "Y", type: "polar",
    codons: getCodonsFor("TYR"),
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },    // 4: Cβ
      { element: "C", pos: [0.0, -2.6, 0.0] },    // 5: Cγ
      { element: "C", pos: [-1.1, -3.3, 0.0] },   // 6: Cδ1
      { element: "C", pos: [1.1, -3.3, 0.0] },    // 7: Cδ2
      { element: "C", pos: [-1.1, -4.6, 0.0] },   // 8: Cε1
      { element: "C", pos: [1.1, -4.6, 0.0] },    // 9: Cε2
      { element: "C", pos: [0.0, -5.3, 0.0] },    // 10: Cζ
      { element: "O", pos: [0.0, -6.5, 0.0] },    // 11: Oη (hydroxyl)
    ],
    bonds: [...BB_BONDS, [1, 4], [4, 5], [5, 6], [5, 7], [6, 8], [7, 9], [8, 10], [9, 10], [10, 11]],
  },
  ASN: {
    name: "Asparagine", abbrev: "ASN", letter: "N", type: "polar",
    codons: getCodonsFor("ASN"),
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },    // 4: Cβ
      { element: "C", pos: [0.0, -2.6, 0.0] },    // 5: Cγ
      { element: "O", pos: [-1.1, -3.5, 0.0] },   // 6: Oδ1
      { element: "N", pos: [1.1, -3.5, 0.0] },    // 7: Nδ2
    ],
    bonds: [...BB_BONDS, [1, 4], [4, 5], [5, 6], [5, 7]],
  },
  GLN: {
    name: "Glutamine", abbrev: "GLN", letter: "Q", type: "polar",
    codons: getCodonsFor("GLN"),
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },    // 4: Cβ
      { element: "C", pos: [0.0, -2.6, 0.0] },    // 5: Cγ
      { element: "C", pos: [0.0, -3.7, 0.0] },    // 6: Cδ
      { element: "O", pos: [-1.1, -4.6, 0.0] },   // 7: Oε1
      { element: "N", pos: [1.1, -4.6, 0.0] },    // 8: Nε2
    ],
    bonds: [...BB_BONDS, [1, 4], [4, 5], [5, 6], [6, 7], [6, 8]],
  },
  ASP: {
    name: "Aspartate", abbrev: "ASP", letter: "D", type: "negative",
    codons: getCodonsFor("ASP"),
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },    // 4: Cβ
      { element: "C", pos: [0.0, -2.6, 0.0] },    // 5: Cγ
      { element: "O", pos: [-1.1, -3.5, 0.0] },   // 6: Oδ1
      { element: "O", pos: [1.1, -3.5, 0.0] },    // 7: Oδ2
    ],
    bonds: [...BB_BONDS, [1, 4], [4, 5], [5, 6], [5, 7]],
  },
  GLU: {
    name: "Glutamate", abbrev: "GLU", letter: "E", type: "negative",
    codons: getCodonsFor("GLU"),
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },    // 4: Cβ
      { element: "C", pos: [0.0, -2.6, 0.0] },    // 5: Cγ
      { element: "C", pos: [0.0, -3.7, 0.0] },    // 6: Cδ
      { element: "O", pos: [-1.1, -4.6, 0.0] },   // 7: Oε1
      { element: "O", pos: [1.1, -4.6, 0.0] },    // 8: Oε2
    ],
    bonds: [...BB_BONDS, [1, 4], [4, 5], [5, 6], [6, 7], [6, 8]],
  },
  LYS: {
    name: "Lysine", abbrev: "LYS", letter: "K", type: "positive",
    codons: getCodonsFor("LYS"),
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },    // 4: Cβ
      { element: "C", pos: [0.0, -2.6, 0.0] },    // 5: Cγ
      { element: "C", pos: [0.0, -3.7, 0.0] },    // 6: Cδ
      { element: "C", pos: [0.0, -4.8, 0.0] },    // 7: Cε
      { element: "N", pos: [0.0, -6.0, 0.0] },    // 8: Nζ (amino)
    ],
    bonds: [...BB_BONDS, [1, 4], [4, 5], [5, 6], [6, 7], [7, 8]],
  },
  ARG: {
    name: "Arginine", abbrev: "ARG", letter: "R", type: "positive",
    codons: getCodonsFor("ARG"),
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },    // 4: Cβ
      { element: "C", pos: [0.0, -2.6, 0.0] },    // 5: Cγ
      { element: "C", pos: [0.0, -3.7, 0.0] },    // 6: Cδ
      { element: "N", pos: [-0.3, -4.8, 0.0] },   // 7: Nε
      { element: "C", pos: [-0.3, -5.9, 0.0] },   // 8: Cζ (guanidinium)
      { element: "N", pos: [-1.3, -6.7, 0.0] },   // 9: Nη1
      { element: "N", pos: [0.7, -6.7, 0.0] },    // 10: Nη2
    ],
    bonds: [...BB_BONDS, [1, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [8, 10]],
  },
  HIS: {
    name: "Histidine", abbrev: "HIS", letter: "H", type: "positive",
    codons: getCodonsFor("HIS"),
    atoms: [
      ...BB,
      { element: "C", pos: [0.0, -1.5, 0.0] },    // 4: Cβ
      { element: "C", pos: [0.0, -2.6, 0.0] },    // 5: Cγ
      { element: "N", pos: [-1.0, -3.3, 0.0] },   // 6: Nδ1
      { element: "C", pos: [0.9, -3.3, 0.0] },    // 7: Cδ2
      { element: "C", pos: [-0.8, -4.5, 0.0] },   // 8: Cε1
      { element: "N", pos: [0.7, -4.5, 0.0] },    // 9: Nε2 (imidazole ring)
    ],
    bonds: [...BB_BONDS, [1, 4], [4, 5], [5, 6], [5, 7], [6, 8], [8, 9], [9, 7]],
  },
};

export const ALL_AAS = Object.values(AMINO_ACIDS);
export const AA_ABBREVS = Object.keys(AMINO_ACIDS);

export function randomCodonFor(abbrev: string): string {
  const codons = AMINO_ACIDS[abbrev].codons;
  return codons[Math.floor(Math.random() * codons.length)];
}

export function generatePeptide(length = 10): { codons: string[]; abbrevs: string[] } {
  const pool = AA_ABBREVS.filter((a) => a !== "MET");
  const abbrevs = ["MET", ...Array.from({ length: length - 1 }, () => pool[Math.floor(Math.random() * pool.length)])];
  const codons = abbrevs.map(randomCodonFor);
  return { codons, abbrevs };
}

export function getOptions(correct: string, count = 9): string[] {
  const others = AA_ABBREVS.filter((a) => a !== correct);
  const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, count - 1);
  const all = [...shuffled, correct].sort(() => Math.random() - 0.5);
  return all;
}
