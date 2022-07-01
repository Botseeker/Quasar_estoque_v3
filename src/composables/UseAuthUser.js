import { ref } from 'vue'
import useSupabase from 'boot/supabase'

const user = ref(null)

export default function useAuthUser() {
    const { supabase } = useSupabase()

    const login = async ({ email, password }) => {
        const { user, error } = await supabase.auth.signIn({ email, password })
        if (error) throw error
        return user
    }
        /*
         login  
         */

    const loginWhithSocialProvider = async (provider) => {
        const { user, error } = await supabase.auth.signIn({ provider })
        if (error) throw error
        return user
    }
        /* 
            login com rede social.
         */
    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    }
    /* 
        Checar se o usuario ta logado
     */

    const isLoggedIn = () => {
        return !!user.value
    }

    /* 
        Registrar
     */

    const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        data: meta,
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation"`
      })
    if (error) throw error
    return user
  }

    const update = async (data) => {
        const { user, error } = await supabase.auth.update(data)
        if (error) throw error
        return user
    }

    const sendPasswordRestEmail = async (email) => {
        const { user, error } = await supabase.auth.api.resetPasssordForEmail(email)
        if (error) throw error
        return user
    }

    const resetPassword = async (aceesToken ,newPassword) => {
        const { user, error} = await supabase.auth.api.updateUser(
           aceesToken,
           { password: newPassword} 
        )
        if (error) throw error
        return user
    }

    return {
        user,
        login,
        loginWhithSocialProvider,
        logout,
        isLoggedIn,
        register,
        update,
        sendPasswordRestEmail,
        resetPassword
    }
}