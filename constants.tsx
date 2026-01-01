
import { Reward, Transaction, User } from './types';

export const PRIMARY_COLOR = '#51B677';

export const MOCK_USER: User = {
  name: 'Jespark',
  totalPoints: 24500,
  availablePoints: 12850,
  tier: 'Gold'
};

export const MOCK_REWARDS: Reward[] = [
  {
    id: '1',
    name: 'หูฟังไร้สายระดับโปร',
    category: 'Electronics',
    points: 8500,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&h=300&auto=format&fit=crop',
    description: 'เสียงคุณภาพสูงพร้อมระบบตัดเสียงรบกวนอัจฉริยะ'
  },
  {
    id: '2',
    name: 'บัตรกำนัลอาหารมื้อค่ำ 1,500 บาท',
    category: 'Vouchers',
    points: 5000,
    image: '/banner-card1.jpg',
    description: 'ใช้ได้ที่ร้านอาหารพรีเมียมกว่า 500 แห่งทั่วประเทศ'
  },
  {
    id: '3',
    name: 'นาฬิกาเพื่อสุขภาพอัจฉริยะ',
    category: 'Lifestyle',
    points: 4200,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=400&h=300&auto=format&fit=crop',
    description: 'ติดตามการก้าวเดิน อัตราการเต้นของหัวใจ และคุณภาพการนอนของคุณ'
  },
  {
    id: '4',
    name: 'ที่พักโรงแรมบูติกช่วงสุดสัปดาห์',
    category: 'Travel',
    points: 15000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&h=300&auto=format&fit=crop',
    description: 'เข้าพัก 2 คืนสำหรับ 2 ท่านที่โรงแรมสุดหรูที่ร่วมรายการ'
  },
  {
    id: '5',
    name: 'กระเป๋าสตางค์หนังดีไซน์เนอร์',
    category: 'Lifestyle',
    points: 3500,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=400&h=300&auto=format&fit=crop',
    description: 'เครื่องหนังพรีเมียมแฮนด์เมดพร้อมระบบป้องกัน RFID'
  },
  {
    id: '6',
    name: 'แท็บเล็ตดีไซน์บางเฉียบ',
    category: 'Electronics',
    points: 12000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400&h=300&auto=format&fit=crop',
    description: 'ประสิทธิภาพอันทรงพลังในรูปลักษณ์ที่บางและสง่างาม'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2023-10-24', description: 'โบนัสประจำเดือน', amount: 500, type: 'earned' },
  { id: 't2', date: '2023-10-20', description: 'ซื้อสินค้าที่ TechStore', amount: 1200, type: 'earned' },
  { id: 't3', date: '2023-10-15', description: 'แลกตั๋วชมภาพยนตร์', amount: 2500, type: 'redeemed' },
  { id: 't4', date: '2023-10-05', description: 'โบนัสแนะนำเพื่อน', amount: 1000, type: 'earned' },
  { id: 't5', date: '2023-09-28', description: 'คะแนนจากร้านอาหาร', amount: 450, type: 'earned' }
];
