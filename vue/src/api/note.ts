import { utils } from 'nfeng-ui-vue'
import { note } from './config'

const { post } = utils

export function addNote(params: any) {
  return post(note.noteAdd, params)
}

export function deleteNote(noteId: any) {
  return post(note.noteDelete, { noteId })
}

export function updateNote(params: any) {
  return post(note.noteUpdate, params)
}

export function getNote(noteId: any) {
  return post(note.noteDetail, { noteId })
}

export function getNoteList() {
  return post(note.noteList)
}
