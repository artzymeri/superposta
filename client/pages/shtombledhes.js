import {getTokenType} from "@/utils/auth";
import {useRouter} from "next/router";
import {useEffect} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import {observer} from "mobx-react-lite";
import AdminHeader from "@/components/admin/Header/AdminHeader";
import ShtoMbledhesContent from "@/components/admin/Mbledhesit/ShtoMbledhesContent";

const AdminHOC = dynamic(
    () => import("@/components/admin/adminHOC"),
    {
        ssr: false,
    }
);


const ShtoMbledhesPage = () => {
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
                            <title>Shto Mbledhës</title>
                        </Head>
                        <AdminHOC>
                            <AdminHeader/>
                            <ShtoMbledhesContent />
                        </AdminHOC>
                    </>
                )
            }
        </>
    )
}

export default observer(ShtoMbledhesPage);