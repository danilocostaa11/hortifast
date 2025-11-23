export interface Product {
  id: string;
  name: string;
  unit: string;
  price?: number;
  image: string;
  category: 'vegetables' | 'fruits' | 'herbs';
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  status: 'new' | 'preparing' | 'ready';
  items: OrderItem[];
  observations?: string;
}

export const products: Product[] = [
  // Verduras e Legumes
  {
    id: '1',
    name: 'Tomate',
    unit: 'kg',
    price: 8.90,
    image: '🍅',
    category: 'vegetables'
  },
  {
    id: '2',
    name: 'Alface',
    unit: 'unidade',
    price: 3.50,
    image: '🥬',
    category: 'vegetables'
  },
  {
    id: '3',
    name: 'Cenoura',
    unit: 'kg',
    price: 5.90,
    image: '🥕',
    category: 'vegetables'
  },
  {
    id: '4',
    name: 'Batata',
    unit: 'kg',
    price: 4.50,
    image: '🥔',
    category: 'vegetables'
  },
  {
    id: '5',
    name: 'Cebola',
    unit: 'kg',
    price: 6.90,
    image: '🧅',
    category: 'vegetables'
  },
  {
    id: '6',
    name: 'Brócolis',
    unit: 'unidade',
    price: 7.90,
    image: '🥦',
    category: 'vegetables'
  },
  {
    id: '16',
    name: 'Abobrinha',
    unit: 'kg',
    price: 6.50,
    image: '🥒',
    category: 'vegetables'
  },
  {
    id: '17',
    name: 'Berinjela',
    unit: 'kg',
    price: 7.90,
    image: '🍆',
    category: 'vegetables'
  },
  {
    id: '18',
    name: 'Beterraba',
    unit: 'kg',
    price: 5.50,
    image: '🥕',
    category: 'vegetables'
  },
  {
    id: '19',
    name: 'Chuchu',
    unit: 'kg',
    price: 3.90,
    image: '🥒',
    category: 'vegetables'
  },
  {
    id: '20',
    name: 'Couve',
    unit: 'maço',
    price: 3.50,
    image: '🥬',
    category: 'vegetables'
  },
  {
    id: '21',
    name: 'Espinafre',
    unit: 'maço',
    price: 4.50,
    image: '🥬',
    category: 'vegetables'
  },
  {
    id: '22',
    name: 'Jiló',
    unit: 'kg',
    price: 8.90,
    image: '🫑',
    category: 'vegetables'
  },
  {
    id: '23',
    name: 'Pepino',
    unit: 'kg',
    price: 5.90,
    image: '🥒',
    category: 'vegetables'
  },
  {
    id: '24',
    name: 'Pimentão Verde',
    unit: 'kg',
    price: 9.90,
    image: '🫑',
    category: 'vegetables'
  },
  {
    id: '25',
    name: 'Pimentão Vermelho',
    unit: 'kg',
    price: 11.90,
    image: '🫑',
    category: 'vegetables'
  },
  {
    id: '26',
    name: 'Quiabo',
    unit: 'kg',
    price: 7.50,
    image: '🌶️',
    category: 'vegetables'
  },
  {
    id: '27',
    name: 'Rabanete',
    unit: 'maço',
    price: 4.50,
    image: '🥕',
    category: 'vegetables'
  },
  {
    id: '28',
    name: 'Repolho',
    unit: 'unidade',
    price: 5.90,
    image: '🥬',
    category: 'vegetables'
  },
  {
    id: '29',
    name: 'Rúcula',
    unit: 'maço',
    price: 4.90,
    image: '🥬',
    category: 'vegetables'
  },
  {
    id: '30',
    name: 'Vagem',
    unit: 'kg',
    price: 8.90,
    image: '🫛',
    category: 'vegetables'
  },
  
  // Frutas
  {
    id: '7',
    name: 'Banana',
    unit: 'kg',
    price: 5.90,
    image: '🍌',
    category: 'fruits'
  },
  {
    id: '8',
    name: 'Maçã',
    unit: 'kg',
    price: 9.90,
    image: '🍎',
    category: 'fruits'
  },
  {
    id: '9',
    name: 'Laranja',
    unit: 'kg',
    price: 6.50,
    image: '🍊',
    category: 'fruits'
  },
  {
    id: '10',
    name: 'Morango',
    unit: 'caixa',
    price: 12.90,
    image: '🍓',
    category: 'fruits'
  },
  {
    id: '11',
    name: 'Abacate',
    unit: 'kg',
    price: 11.90,
    image: '🥑',
    category: 'fruits'
  },
  {
    id: '12',
    name: 'Limão',
    unit: 'kg',
    price: 4.90,
    image: '🍋',
    category: 'fruits'
  },
  {
    id: '31',
    name: 'Abacaxi',
    unit: 'unidade',
    price: 8.90,
    image: '🍍',
    category: 'fruits'
  },
  {
    id: '32',
    name: 'Acerola',
    unit: 'kg',
    price: 9.90,
    image: '🍒',
    category: 'fruits'
  },
  {
    id: '33',
    name: 'Caqui',
    unit: 'kg',
    price: 12.90,
    image: '🍊',
    category: 'fruits'
  },
  {
    id: '34',
    name: 'Coco',
    unit: 'unidade',
    price: 6.90,
    image: '🥥',
    category: 'fruits'
  },
  {
    id: '35',
    name: 'Goiaba',
    unit: 'kg',
    price: 7.90,
    image: '🍐',
    category: 'fruits'
  },
  {
    id: '36',
    name: 'Kiwi',
    unit: 'kg',
    price: 18.90,
    image: '🥝',
    category: 'fruits'
  },
  {
    id: '37',
    name: 'Mamão',
    unit: 'kg',
    price: 6.90,
    image: '🍈',
    category: 'fruits'
  },
  {
    id: '38',
    name: 'Manga',
    unit: 'kg',
    price: 8.90,
    image: '🥭',
    category: 'fruits'
  },
  {
    id: '39',
    name: 'Maracujá',
    unit: 'kg',
    price: 9.90,
    image: '🟡',
    category: 'fruits'
  },
  {
    id: '40',
    name: 'Melancia',
    unit: 'kg',
    price: 3.90,
    image: '🍉',
    category: 'fruits'
  },
  {
    id: '41',
    name: 'Melão',
    unit: 'kg',
    price: 5.90,
    image: '🍈',
    category: 'fruits'
  },
  {
    id: '42',
    name: 'Pera',
    unit: 'kg',
    price: 11.90,
    image: '🍐',
    category: 'fruits'
  },
  {
    id: '43',
    name: 'Pêssego',
    unit: 'kg',
    price: 13.90,
    image: '🍑',
    category: 'fruits'
  },
  {
    id: '44',
    name: 'Tangerina',
    unit: 'kg',
    price: 7.90,
    image: '🍊',
    category: 'fruits'
  },
  {
    id: '45',
    name: 'Uva',
    unit: 'kg',
    price: 14.90,
    image: '🍇',
    category: 'fruits'
  },
  
  // Ervas e Temperos
  {
    id: '13',
    name: 'Manjericão',
    unit: 'maço',
    price: 3.50,
    image: '🌿',
    category: 'herbs'
  },
  {
    id: '14',
    name: 'Coentro',
    unit: 'maço',
    price: 2.90,
    image: '🌿',
    category: 'herbs'
  },
  {
    id: '15',
    name: 'Salsinha',
    unit: 'maço',
    price: 2.50,
    image: '🌿',
    category: 'herbs'
  },
  {
    id: '46',
    name: 'Alecrim',
    unit: 'maço',
    price: 3.90,
    image: '🌿',
    category: 'herbs'
  },
  {
    id: '47',
    name: 'Cebolinha',
    unit: 'maço',
    price: 2.90,
    image: '🌿',
    category: 'herbs'
  },
  {
    id: '48',
    name: 'Hortelã',
    unit: 'maço',
    price: 3.50,
    image: '🌿',
    category: 'herbs'
  },
  {
    id: '49',
    name: 'Orégano',
    unit: 'maço',
    price: 4.50,
    image: '🌿',
    category: 'herbs'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Maria Silva',
    date: '2025-11-22T10:30:00',
    status: 'new',
    items: [
      { productId: '1', productName: 'Tomate', quantity: 3, unit: 'kg' },
      { productId: '2', productName: 'Alface', quantity: 2, unit: 'unidade' },
      { productId: '7', productName: 'Banana', quantity: 2, unit: 'kg' }
    ],
    observations: 'Preferência por tomates maduros'
  },
  {
    id: 'ORD-002',
    customerName: 'João Santos',
    date: '2025-11-22T11:15:00',
    status: 'preparing',
    items: [
      { productId: '3', productName: 'Cenoura', quantity: 2, unit: 'kg' },
      { productId: '4', productName: 'Batata', quantity: 5, unit: 'kg' },
      { productId: '5', productName: 'Cebola', quantity: 3, unit: 'kg' },
      { productId: '13', productName: 'Manjericão', quantity: 1, unit: 'maço' }
    ]
  },
  {
    id: 'ORD-003',
    customerName: 'Restaurante Sabor Verde',
    date: '2025-11-22T09:00:00',
    status: 'ready',
    items: [
      { productId: '1', productName: 'Tomate', quantity: 10, unit: 'kg' },
      { productId: '2', productName: 'Alface', quantity: 8, unit: 'unidade' },
      { productId: '6', productName: 'Brócolis', quantity: 5, unit: 'unidade' },
      { productId: '8', productName: 'Maçã', quantity: 3, unit: 'kg' }
    ],
    observations: 'Entrega antes das 14h, por favor'
  },
  {
    id: 'ORD-004',
    customerName: 'Ana Costa',
    date: '2025-11-22T08:45:00',
    status: 'ready',
    items: [
      { productId: '9', productName: 'Laranja', quantity: 4, unit: 'kg' },
      { productId: '10', productName: 'Morango', quantity: 2, unit: 'caixa' },
      { productId: '7', productName: 'Banana', quantity: 3, unit: 'kg' }
    ]
  }
];
