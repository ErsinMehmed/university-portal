//  "type": "module",
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import chalk from "chalk";
import Ad from "../models/ad.js";
import User from "../models/user.js";
import Role from "../models/role.js";

dotenv.config({ path: new URL("../.env", import.meta.url) });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log("DB Connection Failed", error.message));

const generateFakeAd = (users) => {
  const jobTypes = [
    "Постоянна работа",
    "Временна работа",
    "Стаж",
    "Работа по задание/Freelancer",
  ];

  const experience = [
    "Без опит",
    "до 1",
    "от 1 до 2",
    "от 2 до 3",
    "от 3 до 4",
    "от 4 до 5",
    "от 5 до 10+",
  ];

  const educations = ["Средно образование", "Бакалавър", "Магистър", "Доктор"];

  const randomUser = users[Math.floor(Math.random() * users.length)];

  return {
    title: faker.person.jobTitle(),
    location: faker.location.city(),
    position: faker.person.jobType(),
    employment_type: jobTypes[Math.floor(Math.random() * jobTypes.length)],
    summary: faker.lorem.sentence(),
    field: faker.person.jobArea(),
    experience: experience[Math.floor(Math.random() * experience.length)],
    details: faker.person.jobDescriptor(),
    salary: generateMinMaxNumber(100, 800, 15000),
    remote_work: faker.datatype.boolean(0.5),
    education_requirements:
      educations[Math.floor(Math.random() * educations.length)],
    expired: faker.date.between({
      from: "2023-05-01T00:00:00.000Z",
      to: faker.date.recent(),
    }),
    creator: randomUser._id,
    skills: generateSkills(),
    keywords: generateKeywords(),
    languages: generateLanguages(),
    job_benefits: generateJobBenefits(),
    qualifications: generateQualifications(),
  };
};

const generateMinMaxNumber = (step, min, max) => {
  const randomNumber = faker.number.int({ min: min, max: max });
  const roundedNumber = Math.round(randomNumber / step) * step;

  return roundedNumber;
};

const generateKeywords = () => {
  const numberOfKeywords = Math.floor(Math.random() * 10) + 1;
  const keywords = Array.from({ length: numberOfKeywords }, () =>
    faker.person.jobArea()
  );

  return keywords;
};

const generateJobBenefits = () => {
  const jobBenefits = [
    "Конкурентно възнаграждение",
    "Здравно осигуряване",
    "Отпуск и отпуск за боледуване",
    "Кариерно развитие",
    "Допълнителни социални пакети",
    "Корпоративни събития и дейности",
    "Тиймбилдинг",
    "25 дни платен годишен отпуск",
    "Бонуси и премии",
    "Менторство и кариерно консултиране",
    "Съдействие при релокиране",
    "Зона за отдих и забавления",
    "Напитки в офиса",
  ];

  const numberBenefits = Math.floor(Math.random() * 6) + 1;
  const benefits = Array.from(
    { length: numberBenefits },
    () => jobBenefits[Math.floor(Math.random() * jobBenefits.length)]
  );

  return benefits;
};

const generateLanguages = () => {
  const languages = [
    "Английски",
    "Немски",
    "Френски",
    "Испански",
    "Италиански",
  ];

  const numberOfKeywords = Math.floor(Math.random() * 3) + 1;
  const keywords = Array.from(
    { length: numberOfKeywords },
    () => languages[Math.floor(Math.random() * languages.length)]
  );

  return keywords;
};

const generateSkills = () => {
  const skills = [
    "Програмиране на JavaScript",
    "Управление на бази данни (SQL и NoSQL)",
    "Разработка на приложения с React, Angular, Vue",
    "Мобилни разработки за Android и iOS",
    "Архитектурно проектиране на софтуер",
    "Тестване на софтуерни приложения",
    "Работа на проложения с Java и C#",
    "Управление на проекти",
    "Създаване на потребителски интерфейси (UI/UX)",
    "Работа със системи за контрол на версиите (Git)",
    "Анализ на данни и използване на инструменти като Python и Pandas",
    "Сигурност на софтуерните приложения",
    "Оптимизация на код",
    "Използване на различни езици за програмиране, включително PHP",
    "Облачни технологии и услуги например AWS, Azure и др.",
    "Създаване на микросървизи",
    "Интеграция на API-та",
    "Комуникационни умения и работа в екип",
    "Креативно мислене",
    "Изграждане и управление на бази данни с MongoDB",
    "Оптимизация на уеб страници (SEO)",
    "Работа със системи за управление на съдържание (CMS), като WordPress",
    "Разработка на електронни търговски решения",
    "Изграждане на RESTful и GraphQL API-та",
    "Използване на фреймуърки за тестване, като Jest или Mocha",
    "Използване на инструменти за CI/CD, като Jenkins или Travis CI",
    "Работа със статистически инструменти и езици като R или MATLAB",
  ];

  const numberOfSkills = Math.floor(Math.random() * 5) + 1;
  const skill = Array.from(
    { length: numberOfSkills },
    () => skills[Math.floor(Math.random() * skills.length)]
  );

  return skill;
};

const generateQualifications = () => {
  const qualifications = [
    "Бакалавърска степен в областта на информационните технологии или сходна специалност",
    "Магистърска степен в областта на информационните технологии, софтуерно инженерство или свързана област",
    "Предишен опит в разработка на уеб приложения със съвременни технологии",
    "Добро разбиране на основните принципи на обектно-ориентирано програмиране (ООП)",
    "Опит в работа с релационни и NoSQL бази данни",
    "Oпит в използването на системи за управление на версии (например, Git)",
    "Добри познания във функционалността и създаването на API-та",
    "Способност за разработване на ефективен и оптимизиран софтуерен код",
    "Работен опит със средства за тестване на софтуер (например, Jest, Mocha)",
    "Добри комуникационни умения и способност за работа в екип",
    "Креативно мислене и способност за решаване на проблеми",
    "Опит в създаването на респонсивен и модерен уеб дизайн",
    "Способност за оптимизация на уеб страници за търсачки (SEO)",
    "Знание на стандартите за уеб сигурност и защита от злоупотреби",
    "Познание на английски език на добро равнище - говорим и писмено",
    "Способност за работа в бързо променяща се среда и усвояване на нови технологии",
    "Експертиза в създаването на ресторантски софтуер или приложения",
    "Предишен опит в създаването на мобилни приложения за Android и iOS",
    "Умения в изграждането на електронни търговски решения",
    "Умения с фреймуърк за разработка на уеб приложения (например, Django, Ruby on Rails)",
    "Опит в областта на искуствения интелект и машинното самообучение",
    "Умения в използването на контейнери и оркестрация (например, Docker, Kubernetes)",
    "Опит в работа с облачни платформи и услуги (например, AWS, Azure)",
    "Познания на различни езици за програмиране (Java, C#, Python)",
    "Способност за управление на проекти и работа със SCRUM или други методологии",
    "Предишен опит в областта на сигурността на информационните технологии",
    "Опит в създаването на микросервизна архитектура и дистрибуирани системи",
    "Демонстрирана способност за обучение и наставничество на младши разработчици",
  ];

  const numberOfQualifications = Math.floor(Math.random() * 5) + 1;
  const qualification = Array.from(
    { length: numberOfQualifications },
    () => qualifications[Math.floor(Math.random() * qualifications.length)]
  );

  return qualification;
};

const importData = async () => {
  try {
    await Ad.deleteMany();

    const employerRole = await Role.findOne({ name: "Employer" });

    const users = await User.find({ role: employerRole._id }).select("_id");

    const fakeAdsPromises = Array.from({ length: 100 }, () =>
      generateFakeAd(users)
    );

    const fakeAds = await Promise.all(fakeAdsPromises);

    await Ad.insertMany(fakeAds);

    console.log(
      `${chalk.bold(
        "AdsSeeder.mjs"
      )} .......................................................................................... ${chalk.bold.green(
        "DONE"
      )}`
    );
    process.exit(0);
  } catch (error) {
    console.log(
      `${chalk.bold(
        error.message
      )} .......................................................................................... ${chalk.bold.red(
        "FAILED"
      )}`
    );
    process.exit(1);
  }
};

importData();