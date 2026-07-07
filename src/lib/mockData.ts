export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
  completedAt?: string;
}

export interface Worker {
  id: string;
  name: string;
  avatar: string;
  role: string;
  currentTask: string;
  status: 'v_teku' | 'zakasnitev' | 'koncano';
  tasks: TaskItem[];
  phone: string;
  email: string;
  unreadCount?: number;
}

export interface Order {
  id: string;
  title: string;
  description: string;
  time: string;
  priority: 'normalna' | 'danes' | 'visoka' | 'nujno';
  status: 'caka_potrditev' | 'potrjeno' | 'zavrnjeno';
  workerId: string;
  workerName: string;
}

export interface Message {
  id: string;
  workerId: string;
  workerName: string;
  text: string;
  time: string;
  type: 'glasovno' | 'tekst';
  targetTask?: string;
}

export const initialWorkers: Worker[] = [
  {
    id: "w1",
    name: "Matej Horvat",
    avatar: "MH",
    role: "Terenski vodja",
    currentTask: "BTC · Košnja trave",
    status: "v_teku",
    phone: "+386 40 123 456",
    email: "matej.horvat@dnevnik.app",
    unreadCount: 1,
    tasks: [
      { id: "t1_1", text: "Kositi travnik A", completed: true, completedAt: "08:14" },
      { id: "t1_2", text: "Pokositi robove", completed: true, completedAt: "09:02" },
      { id: "t1_3", text: "Pregled opreme", completed: true, completedAt: "09:45" },
      { id: "t1_4", text: "Pobrati pokošeno", completed: false },
      { id: "t1_5", text: "Fotografija po delu", completed: false }
    ]
  },
  {
    id: "w2",
    name: "Ana Novak",
    avatar: "AN",
    role: "Serviserka",
    currentTask: "Šiška · Servis opreme",
    status: "zakasnitev",
    phone: "+386 31 987 654",
    email: "ana.novak@dnevnik.app",
    unreadCount: 0,
    tasks: [
      { id: "t2_1", text: "Prevzem opreme", completed: true, completedAt: "07:30" },
      { id: "t2_2", text: "Pregled sistema A", completed: true, completedAt: "08:50" },
      { id: "t2_3", text: "Servis sistema B", completed: false }
    ]
  },
  {
    id: "w3",
    name: "Peter Kranjc",
    avatar: "PK",
    role: "Preglednik",
    currentTask: "Center · Pregled objekta",
    status: "koncano",
    phone: "+386 41 555 666",
    email: "peter.kranjc@dnevnik.app",
    unreadCount: 0,
    tasks: [
      { id: "t3_1", text: "Pregled objekta", completed: true, completedAt: "10:15" },
      { id: "t3_2", text: "Podpis zapisnika", completed: true, completedAt: "10:30" }
    ]
  }
];

export const initialOrders: Order[] = [
  {
    id: "o1",
    title: "Zamuda na dostavni trasi #42",
    description: "Ana Novak · zamuda 45 min · stranka čaka",
    time: "08:55",
    priority: "nujno",
    status: "caka_potrditev",
    workerId: "w2",
    workerName: "Ana Novak"
  },
  {
    id: "o2",
    title: "Sestanek ob 14:00",
    description: "Pregled mesečnih nalog z ekipo",
    time: "14:00",
    priority: "visoka",
    status: "caka_potrditev",
    workerId: "w1",
    workerName: "Matej Horvat"
  },
  {
    id: "o3",
    title: "Račun stranki Merkur",
    description: "Oddaja do konca dneva — rok 17:00",
    time: "17:00",
    priority: "danes",
    status: "caka_potrditev",
    workerId: "w3",
    workerName: "Peter Kranjc"
  },
  {
    id: "o4",
    title: "Telefonski klic — dobavitelj",
    description: "Potrditev naročila materiala",
    time: "15:30",
    priority: "normalna",
    status: "caka_potrditev",
    workerId: "w1",
    workerName: "Matej Horvat"
  }
];

export const initialMessages: Message[] = [
  {
    id: "m1",
    workerId: "w1",
    workerName: "Matej Horvat",
    text: "Kosišče A dokončano, začenjam z robovi pri glavni ograji.",
    time: "09:14",
    type: "glasovno",
    targetTask: "BTC · Košnja trave"
  },
  {
    id: "m2",
    workerId: "w2",
    workerName: "Ana Novak",
    text: "Rezervni del manjka pri sistemu B. Čakam na dostavo od skladišča.",
    time: "08:55",
    type: "tekst",
    targetTask: "Šiška · Servis opreme"
  },
  {
    id: "m3",
    workerId: "w3",
    workerName: "Peter Kranjc",
    text: "Pregled objekta zaključen. Vse v redu, ni posebnosti.",
    time: "10:30",
    type: "glasovno",
    targetTask: "Center · Pregled objekta"
  },
  {
    id: "m4",
    workerId: "w1",
    workerName: "Matej Horvat",
    text: "Fotografija bo narejena ob koncu — baterija pri 20%.",
    time: "10:45",
    type: "tekst",
    targetTask: "BTC · Košnja trave"
  }
];
