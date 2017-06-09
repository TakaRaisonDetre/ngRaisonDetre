import {Followers} from './followers';

export interface Npo{
  $key? : string;
  name? : string;
  city?: string;
  language?: string;
  summary?: string;
  website?: string;
  category?: string;
  logoimage?: string;
  latitude?: number;
  longitude?: number;
  path: string;
  followers? : Followers[];
};