import {getTokenType} from "@/utils/auth";
import {useRouter} from "next/router";
import {useEffect} from "react";
import AdminHeader from "@/components/admin/Header/AdminHeader";
import Head from "next/head";
import dynamic from "next/dynamic";
import AdminShoferetContent from "@/components/admin/Shoferet/AdminShoferetContent";
import {observer} from "mobx-react-lite";
import AdminMbledhesitContent from "@/components/admin/Mbledhesit/AdminMbledhesitContent";

const AdminHOC = dynamic(
    () => import("@/components/admin/adminHOC"),
    {
        ssr: false,
    }
);

const ShoferetPage = () => {
    const token = getTokenType();
    const router = useRouter()

    useEffect(() => {
        if (!token) {
            router.push('/kycu')
        }
    },[]);
    return (
        <>
            {
                token === 'admin' && (
                    <>
                        <Head>
                            <title>Mbledhësit</title>
                        </Head>
                        <AdminHOC>
                            <AdminHeader/>
                            <AdminMbledhesitContent />
                        </AdminHOC>
                    </>
                )
            }
        </>
    )
}

export default observer(ShoferetPage);