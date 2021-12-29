export const generateTicketNumber = () => {
  const chars = '0123456789ABCDEFGHJKLMNOPQRSTUVWXYZ';
  var res = '';
  for(let i = 0; i < 6 ; i++) res += chars[Math.floor(Math.random() * chars.length)];
  return res;
}