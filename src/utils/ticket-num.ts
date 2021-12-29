export const generateTicketNumber = () => {
  const chars = '0123456789ABCDEFGHJKLMNOPQRSTUVWXYZ';
  var res = '';
  for(let i = 0; i < 3 ; i++) res += chars[Math.floor(Math.random() * chars.length)];
  res = res + '-';
  for(let i = 0; i < 3 ; i++) res += chars[Math.floor(Math.random() * chars.length)];
  return res;
}