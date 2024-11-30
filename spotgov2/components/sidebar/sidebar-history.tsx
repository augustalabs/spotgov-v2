import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";

// TODO: When we have the real data, we should replace this placeholder data, and
// add the three dots button to open the dialog to clear the history or activate email
// notifications.
const SidebarHistory = () => {
  const placeholderData = [
    {
      name: "Pesquisa 1",
    },
    {
      name: "Pesquisa 2",
    },
    {
      name: "Pesquisa 3",
    },
    {
      name: "Pesquisa 4",
    },
    {
      name: "Pesquisa 5",
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarGroupLabel>Histórico de Pesquisas</SidebarGroupLabel>
        <SidebarMenu>
          {placeholderData.map((data, index) => (
            <SidebarMenuItem key={index}>
              <p className="px-2">{data.name}</p>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarHistory;
