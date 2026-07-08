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
    role: "Serviser",
    currentTask: "Kopalnica prenova",
    status: "v_teku",
    phone: "+386 40 123 456",
    email: "anthony.hopkins@dnevnik.app",
    unreadCount: 1,
    location: "Ljubljana",
    tasks: [
      { id: "t1_1", text: "Pregled instalacij", completed: true, completedAt: "08:14" },
      { id: "t1_2", text: "Montaža armature", completed: true, completedAt: "09:02" },
      { id: "t1_3", text: "Fugiranje ploščic", completed: true, completedAt: "09:45" },
      { id: "t1_4", text: "Slikanje stene", completed: true, completedAt: "10:30" },
      { id: "t1_5", text: "Vgradnja kopalniških elementov", completed: false },
      { id: "t1_6", text: "Inštalacija tuša", completed: false },
      { id: "t1_7", text: "Preizkus tesnosti", completed: false },
      { id: "t1_8", text: "Čiščenje in pospravljanje", completed: false }
    ]
  },
  {
    id: "w2",
    name: "Alec Navarro",
    avatar: "AN",
    role: "Tehnik",
    currentTask: "Windows upgrade",
    status: "zakasnitev",
    phone: "+386 31 987 654",
    email: "alec.navarro@dnevnik.app",
    unreadCount: 0,
    location: "Ljubljana",
    tasks: [
      { id: "t2_1", text: "Prenos datotek", completed: true, completedAt: "07:30" },
      { id: "t2_2", text: "Namestitev posodobitve", completed: false }
    ]
  },
  {
    id: "w3",
    name: "Bo Derek",
    avatar: "BD",
    role: "Čistilec",
    currentTask: "Cleaning service",
    status: "v_teku",
    phone: "+386 41 555 666",
    email: "bo.derek@dnevnik.app",
    unreadCount: 0,
    location: "Ljubljana",
    tasks: [
      { id: "t3_1", text: "Čiščenje hodnikov", completed: true, completedAt: "08:00" },
      { id: "t3_2", text: "Čiščenje pisarn", completed: true, completedAt: "09:15" },
      { id: "t3_3", text: "Čiščenje sanitarij", completed: true, completedAt: "10:00" },
      { id: "t3_4", text: "Sesanje preproge", completed: false },
      { id: "t3_5", text: "Brisanje prahu", completed: false }
    ]
  },
  {
    id: "w4",
    name: "Mr. Bean",
    avatar: "MB",
    role: "Agent",
    currentTask: "Insurance agent",
    status: "v_teku",
    phone: "+386 70 222 333",
    email: "mr.bean@dnevnik.app",
    unreadCount: 0,
    location: "Koper",
    tasks: [
      { id: "t4_1", text: "Sestanek s stranko", completed: true, completedAt: "09:00" },
      { id: "t4_2", text: "Pregled pogodbe", completed: false },
      { id: "t4_3", text: "Podpis dokumentov", completed: false },
      { id: "t4_4", text: "Oddaja vloge", completed: false },
      { id: "t4_5", text: "Potrditev zavarovanja", completed: false },
      { id: "t4_6", text: "Pošiljanje potrditve", completed: false }
    ]
  }
];

export const initialOrders: Order[] = [
  {
    id: "o1",
    title: "Kopalnica prenova • Anthony Hopkins",
    description: "Prometna nesreča pri Celju. Zamuda 45 minut.",
    time: "10:14",
    priority: "nujno",
    status: "caka_potrditev",
    workerId: "w1",
    workerName: "Anthony Hopkins"
  },
  {
    id: "o2",
    title: "Sign import documents",
    description: "",
    time: "11:58",
    priority: "visoka",
    status: "caka_potrditev",
    workerId: "w2",
    workerName: "Alec Navarro"
  },
  {
    id: "o3",
    title: "Meeting at USC",
    description: "",
    time: "13:00",
    priority: "danes",
    status: "caka_potrditev",
    workerId: "w3",
    workerName: "Bo Derek"
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
