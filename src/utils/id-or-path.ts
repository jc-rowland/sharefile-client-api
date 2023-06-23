export default function idOrPath(str:string){
  return str.split('-').length===5?'id':'path';
}