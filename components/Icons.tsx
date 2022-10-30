import { Box, createStyles, Group, SimpleGrid, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
        color: theme.white,
    },
    icon: {
        marginRight: theme.spacing.md,
        backgroundColor: 'transparent',
    },

    title: {
        color: theme.colors[theme.primaryColor][0],
    },

    description: {
        color: theme.white,
    },
}));

interface IconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    icon: React.FC<any>;
    title: React.ReactNode;
    description: React.ReactNode;
}

function ContactIcon({
                         icon: Icon,
                         title,
                         description,
                         className
                     }: IconProps) {
    const { classes, cx } = useStyles();
    return (
        <Group className={cx(classes.wrapper, className)}>
            <Group align="center">
                <Box mr="sm"><Icon size={24}/></Box>
                <div>
                    <Text size="xs" className={classes.title}>{title}</Text>
                    <Text className={classes.description}>{description}</Text>
                </div>
            </Group>
        </Group>
    );
}

interface IconsListProps {
    data: IconProps[];
}

export function CourseDetailsIcons({ data }: IconsListProps) {
    const items = data.map((item, index) => <ContactIcon key={index} {...item} />);
    return <SimpleGrid cols={3} breakpoints={[
        { maxWidth: 'md', cols: 3, spacing: 'md' },
        { maxWidth: 'sm', cols: 1, spacing: 'sm' },
    ]}>{items}</SimpleGrid>;
}
