import {
    ActionIcon,
    Box,
    Button,
    Checkbox,
    Container,
    createStyles,
    Grid,
    Group,
    Image,
    Text,
    TextInput,
    Title
} from '@mantine/core';
import { Lector } from '../../../components/Lector';
import { CourseDetailsIcons } from '../../../components/Icons';
import { openConfirmModal } from '@mantine/modals';
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from "next/head";
import { Course } from "../../../types";
import { ParsedUrlQuery } from "querystring";
import { IconBrandFacebook, IconBrandInstagram, IconCalendarEvent, IconDiscount2, IconMapPin } from "@tabler/icons";
import React from "react";
import { useForm } from "@mantine/form";
import { marked } from 'marked';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: '100%',
        boxSizing: 'border-box',
        padding: theme.spacing.xl * 3,
        backgroundColor: '#414141',
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            padding: theme.spacing.xl,
            paddingTop: theme.spacing.xl * 1.5,
        },
    },

    title: {
        color: theme.white,
        lineHeight: 1,
    },

    description: {
        color: theme.colors[theme.primaryColor][0],
        fontSize: theme.fontSizes.sm,
        "> ul": {
            margin: 0,
            paddingLeft: theme.spacing.md,
            lineHeight: 1.55,
        },
        "> p": {
            margin: theme.spacing.xs,
            lineHeight: 1.55,
        }
    },

    form: {
        marginTop: theme.spacing.xl * 1.5,
        backgroundColor: theme.white,
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.lg,
    },

    social: {
        color: theme.white,

        '&:hover': {
            color: theme.colors[theme.primaryColor][1],
        },
    },

    input: {
        backgroundColor: theme.white,
        borderColor: theme.colors.gray[4],
        color: theme.black,

        '&::placeholder': {
            color: theme.colors.gray[5],
        },
    },

    inputLabel: {
        color: theme.black,
    },

    footer: {
        marginTop: theme.spacing.xl,
        filter: 'invert(1)'
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));

interface ContextParams extends ParsedUrlQuery {
    year: string,
    month: string,
    slug: string
}

function CourseDetails({ name, description, agenda, start, end, id, price, trainers, earlyBird }: Course) {
    const { classes } = useStyles();
    const form = useForm({
        initialValues: {
            name: '',
            phone: '',
            license: '',
            nip: '',
            email: '',
            termsOfService: false,
        },
        validate: {
            name: (value) => (value.length > 5 ? null : 'Wprowadź poprawne dane'),
        },
    });
    const details = [
        {
            title: 'Data',
            description: `${new Intl.DateTimeFormat('pl-PL').format(new Date(start))} - ${new Intl.DateTimeFormat('pl-PL').format(new Date(end))}`,
            icon: IconCalendarEvent
        },
        {
            title: earlyBird && (new Date(earlyBird.end) > new Date()) ? 'Cena do: ' + new Intl.DateTimeFormat('pl-PL').format(new Date(earlyBird.end)) : 'Cena',
            description: <span>
                {earlyBird && <del style={{ marginRight: 10 }}>{new Intl.NumberFormat('pl-PL', {
                    style: 'currency',
                    currency: price.currency
                }).format(price.amount)}</del>}
                {new Intl.NumberFormat('pl-PL', {
                    style: 'currency',
                    currency: price.currency
                }).format(earlyBird ? earlyBird.price.amount : price.amount)}
            </span>,
            icon: IconDiscount2
        },
        { title: 'Adres', description: 'ul. Łuczek 4, Warszawa', icon: IconMapPin },
    ];
    return (
        <>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={classes.wrapper}>
                <Container>
                    <Title className={classes.title}>{name}</Title>
                    <Box className={classes.description} mt="sm" mb="md"
                         dangerouslySetInnerHTML={{ __html: description }}/>
                    <CourseDetailsIcons data={details}/>
                    <Title className={classes.title} order={3} mt="md" mb="md">Kurs prowadzą:</Title>
                    <Group>
                        {trainers.map((trainer, i) => (
                            <Lector key={trainer.name + i} avatar={trainer.photo} title={trainer.title}
                                    name={trainer.name} profession={trainer.profession}/>
                        ))}
                    </Group>
                    <Box>
                        <Title className={classes.title} order={3} mt="md" mb="md">Program szkolenia:</Title>
                        <Box className={classes.description} dangerouslySetInnerHTML={{ __html: agenda }}/>
                    </Box>

                    <form className={classes.form} onSubmit={form.onSubmit((values) => {
                        fetch(`https://api.face-clinic.pl/courses/${id}/register`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(values),
                        }).then(function (response) {
                            if (!response.ok) {
                                throw new Error("error");
                            }
                            return response;
                        }).then(() => {
                            openConfirmModal({
                                title: 'Rejestracja przebiegła pomyślnie',
                                children: (
                                    <Text size="sm">
                                        Dziękujemy za zarejestrowanie się na kursie, skontaktujemy się mailowo.
                                    </Text>
                                ),
                                cancelProps: {
                                    sx: { display: 'none' }
                                },
                                confirmProps: {
                                    color: 'green'
                                },
                                labels: { confirm: 'OK', cancel: '' },
                                onConfirm() {
                                    form.reset();
                                }
                            });
                        }).catch(() => {
                            openConfirmModal({
                                title: 'Wystąpił błąd!',
                                children: (
                                    <Text size="sm">
                                        Coś poszło nie tak, prosimy o spróbowanie ponownie za chwilę lub kontakt z
                                        mailowy:
                                        kursy@face-clinic.pl
                                    </Text>
                                ),
                                cancelProps: {
                                    sx: { display: 'none' }
                                },
                                confirmProps: {
                                    color: 'red'
                                },
                                labels: { confirm: 'OK', cancel: 'Cancel' }
                            })
                        });
                    })}>
                        <Title mb="md" size="h2">Zapisz się na szkolenie</Title>
                        <Grid grow>
                            <Grid.Col xs={12}>
                                <TextInput
                                    label="Imię i Nazwisko"
                                    placeholder="Jan Kowalski"
                                    classNames={{ input: classes.input, label: classes.inputLabel }}
                                    required
                                    {...form.getInputProps('name')}
                                />
                            </Grid.Col>
                            <Grid.Col md={4} xs={12}>
                                <TextInput
                                    label="Email"
                                    placeholder="jan.kowalski@gmail.com"
                                    required
                                    inputMode='email'
                                    type='email'
                                    {...form.getInputProps('email')}
                                />
                            </Grid.Col>
                            <Grid.Col md={4} xs={12}>
                                <TextInput
                                    label="Numer telefonu"
                                    placeholder="+48123456789"
                                    inputMode='tel'
                                    classNames={{ input: classes.input, label: classes.inputLabel }}
                                    required
                                    {...form.getInputProps('phone')}
                                />
                            </Grid.Col>
                            <Grid.Col xs={12}>
                                <TextInput
                                    label="Numer prawa wyk. zawodu"
                                    placeholder="1234567"
                                    classNames={{ input: classes.input, label: classes.inputLabel }}
                                    required
                                    {...form.getInputProps('license')}
                                />
                            </Grid.Col>
                            <Grid.Col xs={12}>
                                <TextInput
                                    label="NIP"
                                    description="w przypadku faktury na firmę"
                                    placeholder="1234567"
                                    classNames={{ input: classes.input, label: classes.inputLabel }}
                                    {...form.getInputProps('nip')}
                                />
                            </Grid.Col>
                            <Grid.Col xs={12}>
                                <Checkbox
                                    required
                                    label={<small>Wyrażam zgodę na przetwarzanie moich danych
                                        osobowych dla potrzeb
                                        niezbędnych do
                                        realizacji zamówienia (zgodnie z Ustawą z dnia 10.05.2018 roku o Ochronie Danych
                                        Osobowych; tekst jednolity: Dz. U. 2018 r. poz. 1000, ustawą z dn. 18 lipca
                                        2002r. o
                                        świadczeniu usług drogą elektroniczną Dz. U. nr 144 poz. 1204 oraz ustawą Prawo
                                        telekomunikacyjne Dz. U. 2004 r. nr 171, poz. 1800).</small>}
                                    color="brown"
                                    {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                                />
                            </Grid.Col>
                        </Grid>
                        <Group position="right" mt="md">
                            <Button type="submit">
                                Zapisz się
                            </Button>
                        </Group>
                    </form>
                </Container>
                <footer className={classes.footer}>
                    <Container className={classes.inner}>
                        <a href="https://face-clinic.pl"><Image sx={{ opacity: 0.5 }} alt="Face-Clinic" src="/logo.svg"
                                                                width={50}/></a>
                        <Group spacing={1} className={classes.links} position="right" noWrap>
                            <ActionIcon size="lg" component="a"
                                        href="https://www.instagram.com/faceclinicwarszawa/">
                                <IconBrandInstagram size={18} stroke={1.5}/>
                            </ActionIcon>
                            <ActionIcon size="lg" component="a"
                                        href="https://pl-pl.facebook.com/FaceClinicWarszawa/">
                                <IconBrandFacebook size={18} stroke={1.5}/>
                            </ActionIcon>
                        </Group>
                    </Container>
                </footer>
            </div>
        </>

    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const data = await fetch('https://api.face-clinic.pl/courses').then(response => response.json());
    const { slug, month, year } = context.params as ContextParams;
    const course = data.find((course: Course) => {
        const date = new Date(course.start);
        return course.slug === slug && zeroPad(date.getUTCMonth() + 1, 2) == month && date.getFullYear().toString() === year;
    });
    return {
        props: {
            ...course,
            agenda: marked.parse(course.agenda),
            description: marked.parse(course.description)
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await fetch('https://api.face-clinic.pl/courses').then(response => response.json());
    const paths = data.map((course: Course) => {
        const startDate = new Date(course.start);
        return ({
            params: {
                year: `${startDate.getFullYear()}`,
                month: `${zeroPad(startDate.getUTCMonth() + 1, 2)}`,
                slug: course.slug,
            }
        });
    });
    return { paths, fallback: false }
}

function zeroPad(num: number, places: number) {
    const zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

export default CourseDetails;
