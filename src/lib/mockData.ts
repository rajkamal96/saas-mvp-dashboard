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
  location?: string;
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
    name: "Anthony Hopkins",
    avatar: "AH",
    role: "Novak d.o.o.",
    currentTask: "Kopalnica prenova",
    status: "v_teku",
    phone: "+386 40 123 456",
    email: "anthony.hopkins@dnevnik.app",
    unreadCount: 1,
    location: "Ljubljana",
    tasks: [
      { id: "t1_1", text: "Odvoz materiala - Stane", completed: true, completedAt: "08:14" },
      { id: "t1_2", text: "Dostava ploščic - Adam", completed: false },
      { id: "t1_3", text: "Polaganje ploščic", completed: false }
    ]
  },
  {
    id: "w2",
    name: "ANA NOVAK",
    avatar: "AN",
    role: "JGD d.o.o.",
    currentTask: "Čiščenje prostorov",
    status: "zakasnitev",
    phone: "+386 31 987 654",
    email: "alec.navarro@dnevnik.app",
    unreadCount: 0,
    location: "Ljubljana",
    tasks: [
      { id: "t2_1", text: "Slika 3 - končano", completed: true, completedAt: "07:30" },
      { id: "t2_2", text: "Dnevno poročilo", completed: false }
    ]
  },
  {
    id: "w3",
    name: "PAVLE",
    avatar: "BD",
    role: "FxG d.o.o.",
    currentTask: "Dostava cvetja",
    status: "v_teku",
    phone: "+386 41 555 666",
    email: "bo.derek@dnevnik.app",
    unreadCount: 0,
    location: "Celje",
    tasks: [
      { id: "t3_1", text: "Prevzem cvetja", completed: true, completedAt: "08:00" },
      { id: "t3_2", text: "Dostava", completed: false },
      { id: "t3_3", text: "Potrdilo o dostavi", completed: false }
    ]
  }
];

export const initialOrders: Order[] = [
  {
    id: "o1",
    title: "Pokliči Maksa za rezervacijo",
    description: "Danes je zadnji dan. ",
    time: "10:14",
    priority: "nujno",
    status: "caka_potrditev",
    workerId: "w1",
    workerName: "ANA NOVAK"
  },
  {
    id: "o2",
    title: "Podpiši izvozne dokumente",
    description: "",
    time: "11:58",
    priority: "visoka",
    status: "caka_potrditev",
    workerId: "w2",
    workerName: "ANTHONY H"
  },
  {
    id: "o3",
    title: "Kosilo s Kristino",
    description: "",
    time: "13:00",
    priority: "danes",
    status: "caka_potrditev",
    workerId: "w3",
    workerName: "ALEKS"
  }
];


export const initialMessages: Message[] = [
  {
    id: "m1",
    workerId: "w1",
    workerName: "ANA NOVAK",
    text: "Stranke ni bilo na naslovu. Začenjam pol ure kasneje.  ",
    time: "09:14",
    type: "glasovno",
    targetTask: "Čiščenje prostorov"
  },
  {
    id: "m2",
    workerId: "w2",
    workerName: "ANTHONY H",
    text: "Prometna nesreča pri Celju. Zaprta cesta do 13:30.",
    time: "08:55",
    type: "glasovno",
    targetTask: "Kopalnica prenova"
  },
  {
    id: "m3",
    workerId: "w3",
    workerName: "ALEKS",
    text: "Preveri dokumente za Graz. Pokliči Ano.",
    time: "10:30",
    type: "glasovno",
    targetTask: "Popravilo dvigala"
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
