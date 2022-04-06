/* Spell element declation*/
export interface SpellsElement {
  count: number;
  result: ResultElement[];
}

/* Result element declation*/
export interface ResultElement {
  index: string;
  name: string;
  url: string;
}

/* Spell data declation*/
export interface SpellData {
  id: number;
  index: string;
  name: string;
  url: string;
  favourite: boolean;
}

/* Spell description declation*/
export interface SpellDesc {
  index: string;
  name: string;
  desc: string;
  higher_level: string;
  range: string;
  components: string;
  material: string;
  ritual: string;
  duration: string;
  concentration: string;
  casting_time: string;
  level: string;
  attack_type: string;
  damage: string;
  school: ResultElement;
  classes: ResultElement[];
  subclasses: ResultElement[];
}