import { setLocalStorage } from '../utils'
import { TopicParams } from '../utils/global'
import { supabase } from './init'

const useSupabase = () => {
  async function login({ email, password }) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      localStorage.setItem('user', JSON.stringify(data))
      chrome.storage.local.set({ user: data })
      console.log({ data, error })
      return { data, error }
    } catch (e) {
      console.log({ e })
      return { data: null, error: true }
    }
  }

  async function signUp({ email, password }) {
    try {
      const { data } = await supabase.auth.signUp({
        email,
        password,
      })
      chrome.storage.local.set({ user: data })
      localStorage.setItem('user', JSON.stringify(data))
      return data.user
    } catch (error) {
      console.log({ error })
      return error
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    localStorage.setItem('user', JSON.stringify(null))
    return error ?? true
  }

  async function createFolder(folder: string) {
    try {
      const { data, error } = await supabase
        .from('tbl_folder')
        .insert([{ name: folder }])
        .select()
      console.log({ data, error })
      return { data, error }
    } catch (error) {
      console.log(error)
    }
  }

  async function updateFolder({ updatedfolder, currentFolder }) {
    try {
      const { data, error } = await supabase
        .from('tbl_folder')
        .update([{ name: updatedfolder }])
        .eq('name', currentFolder)
      return { data, error }
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteFolder(folderId: string) {
    try {
      const { data, error } = await supabase.from('tbl_folder').delete().eq('id', folderId)
      return { data, error }
    } catch (error) {
      console.log(error)
    }
  }

  async function getAllFolders() {
    try {
      const { data, error } = await supabase.from('tbl_folder').select('*').order('created_at', { ascending: false })
      setLocalStorage('allFolders', data)
      return { data, error }
    } catch (error) { }
  }

  async function createTopic(body: TopicParams) {
    try {
      const { folderId, topic, answer, cta } = body
      console.log({ body })
      const { data, error } = await supabase
        .from('tbl_topic')
        .insert([
          { folder_id: folderId, topic: topic ?? '', answer: answer ?? [], cta: cta ?? []},
        ]).select()
      return { data, error }
    } catch (error) {
      console.log(error)
    }
  }
  async function updateTopic(body: TopicParams) {
    try {
      const { topic, answer, cta, id } = body
      const { data, error } = await supabase
        .from('tbl_topic')
        .update([{ topic: topic ?? '', answer: answer ?? [''], cta: cta ?? [''] },])
        .eq('id', id)
        .select()
      return { data, error }
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteTopic(TopicId: number) {
    try {
      const { data, error } = await supabase.from('tbl_topic').delete().eq('id', TopicId)
      return { data, error }
    } catch (error) {
      console.log(error)
    }
  }
  async function getAllTopics() {
    try {
      const { data, error } = await supabase.from('tbl_topic').select('*')
      setLocalStorage('allTopics', data)
      return { data, error }
    } catch (error) {
      console.log(error)
    }
  }
  async function getAllTopicsOfFolder(folderId: string) {
    try {
      const { data, error } = await supabase.from('tbl_topic').select('*').eq('folderId', folderId)
      return { data, error }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    signUp,
    login,
    signOut,
    createFolder,
    updateFolder,
    deleteFolder,
    getAllFolders,
    getAllTopicsOfFolder,
    createTopic,
    updateTopic,
    deleteTopic,
    getAllTopics,
  }
}

export default useSupabase
