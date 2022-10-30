import { createStyles, Avatar, Text, Group, Title } from '@mantine/core';
const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },
}));

interface UserInfoIconsProps {
  avatar: string;
  name: string;
  title: string;
  profession: string;
}

export function Lector({ avatar, name, title, profession }: UserInfoIconsProps) {
  const { classes } = useStyles();
  return (
    <div>
      <Group noWrap>
        <Avatar src={avatar} size={94} radius="xl" />
        <div>
          <Text size="xs" weight={700} color="white">
            {title}
          </Text>
          <Title order={4} sx={{ textTransform: 'uppercase' }} color="white">
          {name}
          </Title>
          <Text size="sm" weight={500} color="white">
          {profession}
          </Text>
        </div>
      </Group>
    </div>
  );
}