import neill from "@/assets/team/neill-mtungwazi.webp";
import patricia from "@/assets/team/patricia-sibanda.webp";
import lynnete from "@/assets/team/lynnete-dube-famba.webp";
import kudakwashe from "@/assets/team/kudakwashe-yotamu.webp";
import vongai from "@/assets/team/vongai-chirongoma.webp";
import batsirai from "@/assets/team/batsirai-runeka.webp";
import tinaye from "@/assets/team/tinaye-chiweshe.webp";
import brett from "@/assets/team/brett.webp";
import rumbidzai from "@/assets/team/rumbidzai-muza.webp";
import charlotte from "@/assets/team/charlotte-kapasura.webp";
import pauline from "@/assets/team/pauline-marime.webp";
import adrianna from "@/assets/team/adrianna-chiyangwa.webp";
import tinevimbo from "@/assets/team/tinevimbo-nyoni.webp";
import vimbai from "@/assets/team/vimbai-simango.webp";
import brendon from "@/assets/team/brendon-kawanza.webp";
import sean from "@/assets/team/sean-mponda.webp";

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  image: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "neill-mtungwazi",
    name: "Dr Neill Mtungwazi",
    title: "Executive Director / Dispensing Optician",
    image: neill,
  },
  {
    id: "patricia-sibanda",
    name: "Ms Patricia Sibanda",
    title: "Finance & Administration Manager",
    image: patricia,
  },
  {
    id: "lynnete-dube-famba",
    name: "Mrs Lynnete Dube-Famba",
    title: "Strategic Communication & Marketing Lead",
    image: lynnete,
  },
  {
    id: "kudakwashe-yotamu",
    name: "Mr Kudakwashe Yotamu",
    title: "Branch Manager / Dispensing",
    image: kudakwashe,
  },
  {
    id: "vongai-chirongoma",
    name: "Ms Vongai Tafadzwa Chirongoma",
    title: "Branch Manager / Dispensing",
    image: vongai,
  },
  {
    id: "batsirai-runeka",
    name: "Mr Batsirai Runeka",
    title: "Branch Manager / Dispensing",
    image: batsirai,
  },
  {
    id: "tinaye-chiweshe",
    name: "Mr Tinaye Munyaradzi Chiweshe",
    title: "Dispensing Assistant",
    image: tinaye,
  },
  {
    id: "brett",
    name: "Mr Brett Dzemura",
    title: "Dispensing Assistant",
    image: brett,
  },
  {
    id: "rumbidzai-muza",
    name: "Ms Rumbidzai Muza",
    title: "Optometrist",
    image: rumbidzai,
  },
  {
    id: "charlotte-kapasura",
    name: "Ms Charlotte Runyararo Kapasura",
    title: "Pre Reg Optometrist",
    image: charlotte,
  },
  {
    id: "pauline-marime",
    name: "Mrs Pauline Ropafadzo Marime",
    title: "Pre Reg Optometrist",
    image: pauline,
  },
  {
    id: "adrianna-chiyangwa",
    name: "Ms Adrianna Tanyaradzwa Chiyangwa",
    title: "Receptionist",
    image: adrianna,
  },
  {
    id: "tinevimbo-nyoni",
    name: "Ms Tinevimbo Patricia Nyoni",
    title: "Receptionist",
    image: tinevimbo,
  },
  {
    id: "vimbai-simango",
    name: "Ms Vimbai Shaunice Simango",
    title: "Receptionist",
    image: vimbai,
  },
  {
    id: "brendon-kawanza",
    name: "Mr Brendon Kawanza",
    title: "Lab Technician",
    image: brendon,
  },
  {
    id: "sean-mponda",
    name: "Mr Sean Mponda",
    title: "Lab Technician",
    image: sean,
  },
];
