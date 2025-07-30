import type { ShipStats } from "./ships";

// Each faction can have zero or more unique ships (flagships, special cruisers, etc.)
// Stats are generally identical to the base 'flagship' (6≥, 2 dice) unless noted otherwise.
export const FACTION_UNITS: Record<
  string,                // faction name
  { key: string; stats: ShipStats }[]
> = {
    // ─────── Arborec ───────────────────────────────────────────────────────────
  Arborec: [
    {
      key: "arborecFlagship",
      stats: {
        name: "Duha Menaimon",
        type: "flagship",
        fs: 1,
        cap: 5,
        cost: 8,
        combat: 7,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

    // ─────── Argent Flight  ───────────────────────────────────────────────────────────
  "Argent Flight": [
    {
      key: "argentStrikeAlpha",
      stats: {
        name: "Strike Wing Alpha",
        type: "destroyer",
        fs: 1,
        cap: 1,
        cost: 1,
        combat: 8,
        dice: 1,
        afb: {
          dice: 2,
          combat: 9,
        },
        upgraded: {
            combat: 7,
            afb: { dice: 3, combat: 6 }
        },
        hitPoints: 1,
        sustainDamage: false,

      },
    },
    {
      key: "argentFlagship",
      stats: {
        name: "Quetzecoatl",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 8,
        combat: 7,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

  // ─────── Barony of Letnev ─────────────────────────────────────────────────
  "Barony of Letnev": [
    {
      key: "letnevFlagship",
      stats: {
        name: "Arc Secundus",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 8,
        combat: 5,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

  // ─────── Clan of Saar ──────────────────────────────────────────────────────
  "Clan of Saar": [
    {
      key: "saarFlagship",
      stats: {
        name: "Son of Ragh",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 8,
        combat: 5,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
        afb: {
          dice: 4,
          combat: 6,
        },
      },
    },
  ],
  
  // ─────── The Council Keleres ──────────────────────────────────────────────────────
  "The Council Keleres": [
    {
      key: "keleresFlagship",
      stats: {
        name: "Artemiris",
        type: "flagship",
        fs: 1,
        cap: 6,
        cost: 8,
        combat: 7,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

  // ─────── Embers of Muaat ───────────────────────────────────────────────────
  "Embers of Muaat": [
    {
      key: "embersWarsun",
      stats: {
        name: "Prototype War Sun",
        type: "warsun",
        fs: 1,
        cap: 6,
        cost: 12,
        combat: 3,
        dice: 3,
        upgraded: {
            cost: 10,
        },
        hitPoints: 2,
        sustainDamage: true,
      },
    },
    {
      key: "muatFlagship",
      stats: {
        name: "The Inferno",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 10,
        combat: 5,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

    // ─────── Emirates of Hacan ─────────────────────────────────────────────────
  "Emirates of Hacan": [
    {
      key: "hacanFlagship",
      stats: {
        name: "Wrath of Kenara",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 8,
        combat: 7,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

      // ─────── The Empyrean ─────────────────────────────────────────────────
  "Empyrean": [
    {
      key: "empyreanFlagship",
      stats: {
        name: "Dynamo",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 8,
        combat: 5,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

  // ─────── Federation of Sol ─────────────────────────────────────────────────
  "Federation of Sol": [
    {
      key: "solCarrier",
      stats: {
        name: "Advanced Carrier",
        type: "carrier",
        fs: 1,
        cap: 6,
        cost: 3,
        combat: 9,
        dice: 1,
        upgraded: {
            cap: 8,
            hitPoints: 2,
            sustainDamage: true,
        },
        hitPoints: 1,
        sustainDamage: false,
      },
    },
    {
      key: "solFlagship",
      stats: {
        name: "Genesis",
        type: "flagship",
        fs: 1,
        cap: 12,
        cost: 8,
        combat: 5,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

  // ─────── Ghosts of Creuss ──────────────────────────────────────────────────
  "Ghosts of Creuss": [
    {
      key: "creussFlagship",
      stats: {
        name: "Hil Colish",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 6,
        combat: 5,
        dice: 1,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

  // ─────── L1Z1X Mindnet ──────────────────────────────────────────────────────
  "L1Z1X Mindnet": [
    {
      key: "lizixDreadnought",
      stats: {
        name: "Super-Dreadnought",
        type: "dreadnought",
        fs: 1,
        cap: 2,
        cost: 4,
        combat: 5,
        dice: 1,
        upgraded: {
            combat: 4,
        },
        hitPoints: 2,
        sustainDamage: true,
      },
    },
    {
      key: "l1z1xFlagship",
      stats: {
        name: "[0.0.1]",
        type: "flagship",
        fs: 1,
        cap: 5,
        cost: 8,
        combat: 5,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

    // ─────── Mahact Gene Sorcerers ───────────────────────────────────────────────────
  "Mahact Gene Sorcerers": [
    {
      key: "mahactFlagship",
      stats: {
        name: "Arvicon Rex ",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 8,
        combat: 5,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

  // ─────── Mentak Coalition ───────────────────────────────────────────────────
  "Mentak Coalition": [
    {
      key: "mentakFlagship",
      stats: {
        name: "Fourth Moon",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 8,
        combat: 7,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

  // ─────── Naalu Collective ───────────────────────────────────────────────────
  "Naalu Collective": [
    {
      key: "naaluFighter",
      stats: {
        name: "Hybrid Crystal Fighter",
        type: "fighter",
        fs: 0,
        cap: -1,
        cost: 0.5,
        combat: 8,
        dice: 1,
        upgraded: {
            combat: 7,
        },
        hitPoints: 1,
        sustainDamage: false,
      },
    },
    {
      key: "naaluFlagship",
      stats: {
        name: "Matriarch",
        type: "flagship",
        fs: 1,
        cap: 6,
        cost: 8,
        combat: 9,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

    // ─────── Naaz-Rokha Alliance ───────────────────────────────────────────────────────
  "Naaz-Rokha Alliance": [
    {
      key: "nekroFlagship",
      stats: {
        name: "Visz el Vir",
        type: "flagship",
        fs: 1,
        cap: 4,
        cost: 8,
        combat: 9,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

  // ─────── Nekro Virus ───────────────────────────────────────────────────────
  "Nekro Virus": [
    {
      key: "nekroFlagship",
      stats: {
        name: "The Alastor",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 8,
        combat: 9,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

    // ─────── The Nomad ───────────────────────────────────────────────────────
  "The Nomad": [
    {
      key: "nomadFlagship",
      stats: {
        name: "Memoria",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 8,
        combat: 7,
        dice: 2,
        afb: {
          dice: 3,
          combat: 8,
        },
        upgraded: {
            afb: { dice: 3, combat: 5},
            cap: 6,
            combat: 5,
        },
        hitPoints: 2,
        sustainDamage: true,

      },
    },
  ],

  // ─────── Sardakk N'orr ──────────────────────────────────────────────────────
  "Sardakk N'orr": [
    {
      key: "sardakkDreadnought",
      stats: {
        name: "Exotrireme",
        type: "dreadnought",
        fs: 1,
        cap: 1,
        cost: 4,
        combat: 5,
        dice: 1,
        upgraded: {

        },
        hitPoints: 2,
        sustainDamage: true,
      },
    },
    {
      key: "sardakkFlagship",
      stats: {
        name: "C'Morran N'orr",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 8,
        combat: 6,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

    // ─────── Titans of Ul ──────────────────────────────────────────────────────
  "Titans of Ul": [
    {
      key: "titansCruiser",
      stats: {
        name: "Saturn Engine",
        type: "cruiser",
        fs: 1,
        cap: 1,
        cost: 2,
        combat: 7,
        dice: 1,
        upgraded: {
            cap: 2,
            combat: 6,
            hitPoints: 2,
            sustainDamage: true,
        },
        hitPoints: 1,
        sustainDamage: false,
      },
    },
    {
      key: "titansFlagship",
      stats: {
        name: "Ouranos",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 8,
        combat: 7,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

  // ─────── Universities of Jol‑Nar ───────────────────────────────────────────
  "Jol‑Nar": [
    {
      key: "jolNarFlagship",
      stats: {
        name: "J.N.S. Hylarim",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 8,
        combat: 6,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

  // ─────── The Vuil'Raith Cabal ──────────────────────────────────────────────────────
  "Vuil'Raith Cabal": [
    {
      key: "cabalFlagship",
      stats: {
        name: "The Terror Between",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 8,
        combat: 5,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

    // ─────── Winnu ──────────────────────────────────────────────────────
  "Winnu": [
    {
      key: "winnuFlagship",
      stats: {
        name: "Salai Sai Corian",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 8,
        combat: 7,
        dice: 3,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

  // ─────── Xxcha Kingdom ──────────────────────────────────────────────────────
  "Xxcha Kingdom": [
    {
      key: "xxchaFlagship",
      stats: {
        name: "Loncarra Ssodu",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 8,
        combat: 7,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

  // ─────── Yin Brotherhood ────────────────────────────────────────────────────
  "Yin Brotherhood": [
    {
      key: "yinFlagship",
      stats: {
        name: "Van Hauge",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 8,
        combat: 9,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],

  // ─────── Yssaril Tribes ─────────────────────────────────────────────────────
  "Yssaril Tribes": [
    {
      key: "yssarilFlagship",
      stats: {
        name: "Y'sia Y'ssrila",
        type: "flagship",
        fs: 1,
        cap: 3,
        cost: 8,
        combat: 5,
        dice: 2,
        hitPoints: 2,
        sustainDamage: true,
      },
    },
  ],
};
