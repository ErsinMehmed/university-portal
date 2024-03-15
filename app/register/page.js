"use client";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button, Checkbox } from "@nextui-org/react";
import { authStore, commonStore } from "../../stores/useStore";
import { RoleEnums } from "../../enums/role";
import Alert from "../../components/Alert";
import Select from "../../components/html/Select";
import Input from "../../components/html/Input";

const Register = () => {
  const { roles, userData, setUserData, createUserProfile, loadRoles } =
    authStore;
  const { errorFields, errorMessage, successMessage } = commonStore;
  const { data: session } = useSession();
  const router = useRouter();

  const [termsCheckbox, setTermsCheckbox] = useState(false);

  useEffect(() => {
    if (session?.user.role === RoleEnums.EMPLOYER) {
      router.push("/dashboard");
    } else if (
      session?.user.role === RoleEnums.EMPLOYEE ||
      session?.user.role === RoleEnums.FREELANCER
    ) {
      router.push("/");
    }

    loadRoles();
  }, [session, router, loadRoles]);

  const handleInputChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <Alert />

      <section className="flex items-center justify-center min-h-screen w-full bg-[#f3f7fd] py-10 2xl:py-0">
        <div className="flex flex-col items-center justify-center px-6 py-8 w-full sm:mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800">
                Създайте акаунт
              </h1>

              <Select
                items={roles.roles}
                label="Вие сте"
                errorMessage={errorFields.role}
                onChange={(value) => handleInputChange("role", value)}
              />

              <Input
                type="text"
                label={
                  userData.role === RoleEnums.EMPLOYERID
                    ? "Име на фирмата"
                    : "Име и фамилия"
                }
                value={userData.name}
                errorMessage={errorFields.name}
                onClear={() => handleInputChange("name", "")}
                onChange={(value) => handleInputChange("name", value)}
              />

              {userData.role !== RoleEnums.EMPLOYERID && (
                <Input
                  type="date"
                  label="Дата на раждане"
                  value={userData.birthday}
                  errorMessage={errorFields.birthday}
                  onClear={() => handleInputChange("birthday", "")}
                  onChange={(value) => handleInputChange("birthday", value)}
                />
              )}

              {userData.role !== RoleEnums.EMPLOYERID && (
                <Input
                  type="text"
                  label="Град"
                  value={userData.city}
                  errorMessage={errorFields.city}
                  onClear={() => handleInputChange("city", "")}
                  onChange={(value) => handleInputChange("city", value)}
                />
              )}

              {userData.role === RoleEnums.EMPLOYERID && (
                <Input
                  type="text"
                  label="ДДС номер"
                  value={userData.vat_number}
                  errorMessage={errorFields.vat_number}
                  onClear={() => handleInputChange("vat_number", "")}
                  onChange={(value) => handleInputChange("vat_number", value)}
                />
              )}

              <Input
                type="email"
                label="Имейл"
                value={userData.email}
                errorMessage={errorFields.email}
                onClear={() => handleInputChange("email", "")}
                onChange={(value) => handleInputChange("email", value)}
              />

              <Input
                label="Парола"
                type={"password"}
                value={userData.password}
                errorMessage={errorFields.password}
                onChange={(value) => handleInputChange("password", value)}
              />

              <Input
                label="Потвърди парола"
                type={"password"}
                value={userData.passwordRep}
                errorMessage={errorFields.passwordRep}
                onChange={(value) => handleInputChange("passwordRep", value)}
              />

              <div className="flex items-start space-x-1.5">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Checkbox
                      isSelected={termsCheckbox}
                      onValueChange={() => {
                        setTermsCheckbox(termsCheckbox ? false : true);
                      }}
                      size="sm"
                    >
                      Приемам
                    </Checkbox>
                  </div>
                </div>

                <Link
                  href="#"
                  className="hover:underline text-blue-600 text-sm pr-10 sm:pr-36"
                >
                  условията
                </Link>
              </div>

              <Button
                className="w-full"
                color="primary"
                isDisabled={!termsCheckbox}
                onClick={createUserProfile}
              >
                Регистрация
              </Button>

              <p className="text-sm font-light text-gray-500">
                Вече имате акаунт?{" "}
                <Link href="/login" className="hover:underline text-blue-500">
                  Вход
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default observer(Register);
