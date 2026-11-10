import { CreateUserData, CreateUserVariables, UpdateUserData, UpdateUserVariables, DeleteUserData, GetUserData, ListUsersData, CreateConversationData, CreateConversationVariables, UpdateConversationData, UpdateConversationVariables, DeleteConversationData, DeleteConversationVariables, GetConversationData, GetConversationVariables, ListConversationsData, CreateParticipantData, CreateParticipantVariables, UpdateParticipantData, UpdateParticipantVariables, DeleteParticipantData, DeleteParticipantVariables, GetParticipantData, GetParticipantVariables, ListParticipantsData, ListParticipantsVariables, SendMessageData, SendMessageVariables, DeleteMessageData, DeleteMessageVariables, ListMessagesData, ListMessagesVariables, GiveFeedbackData, GiveFeedbackVariables, DeleteFeedbackData, DeleteFeedbackVariables, ListFeedbackForUserData, ListFeedbackForUserVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables | void>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables | void>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;

export function useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;
export function useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;

export function useGetUser(options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;
export function useGetUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;

export function useListUsers(options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
export function useListUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;

export function useCreateConversation(options?: useDataConnectMutationOptions<CreateConversationData, FirebaseError, CreateConversationVariables>): UseDataConnectMutationResult<CreateConversationData, CreateConversationVariables>;
export function useCreateConversation(dc: DataConnect, options?: useDataConnectMutationOptions<CreateConversationData, FirebaseError, CreateConversationVariables>): UseDataConnectMutationResult<CreateConversationData, CreateConversationVariables>;

export function useUpdateConversation(options?: useDataConnectMutationOptions<UpdateConversationData, FirebaseError, UpdateConversationVariables>): UseDataConnectMutationResult<UpdateConversationData, UpdateConversationVariables>;
export function useUpdateConversation(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateConversationData, FirebaseError, UpdateConversationVariables>): UseDataConnectMutationResult<UpdateConversationData, UpdateConversationVariables>;

export function useDeleteConversation(options?: useDataConnectMutationOptions<DeleteConversationData, FirebaseError, DeleteConversationVariables>): UseDataConnectMutationResult<DeleteConversationData, DeleteConversationVariables>;
export function useDeleteConversation(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteConversationData, FirebaseError, DeleteConversationVariables>): UseDataConnectMutationResult<DeleteConversationData, DeleteConversationVariables>;

export function useGetConversation(vars: GetConversationVariables, options?: useDataConnectQueryOptions<GetConversationData>): UseDataConnectQueryResult<GetConversationData, GetConversationVariables>;
export function useGetConversation(dc: DataConnect, vars: GetConversationVariables, options?: useDataConnectQueryOptions<GetConversationData>): UseDataConnectQueryResult<GetConversationData, GetConversationVariables>;

export function useListConversations(options?: useDataConnectQueryOptions<ListConversationsData>): UseDataConnectQueryResult<ListConversationsData, undefined>;
export function useListConversations(dc: DataConnect, options?: useDataConnectQueryOptions<ListConversationsData>): UseDataConnectQueryResult<ListConversationsData, undefined>;

export function useCreateParticipant(options?: useDataConnectMutationOptions<CreateParticipantData, FirebaseError, CreateParticipantVariables>): UseDataConnectMutationResult<CreateParticipantData, CreateParticipantVariables>;
export function useCreateParticipant(dc: DataConnect, options?: useDataConnectMutationOptions<CreateParticipantData, FirebaseError, CreateParticipantVariables>): UseDataConnectMutationResult<CreateParticipantData, CreateParticipantVariables>;

export function useUpdateParticipant(options?: useDataConnectMutationOptions<UpdateParticipantData, FirebaseError, UpdateParticipantVariables>): UseDataConnectMutationResult<UpdateParticipantData, UpdateParticipantVariables>;
export function useUpdateParticipant(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateParticipantData, FirebaseError, UpdateParticipantVariables>): UseDataConnectMutationResult<UpdateParticipantData, UpdateParticipantVariables>;

export function useDeleteParticipant(options?: useDataConnectMutationOptions<DeleteParticipantData, FirebaseError, DeleteParticipantVariables>): UseDataConnectMutationResult<DeleteParticipantData, DeleteParticipantVariables>;
export function useDeleteParticipant(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteParticipantData, FirebaseError, DeleteParticipantVariables>): UseDataConnectMutationResult<DeleteParticipantData, DeleteParticipantVariables>;

export function useGetParticipant(vars: GetParticipantVariables, options?: useDataConnectQueryOptions<GetParticipantData>): UseDataConnectQueryResult<GetParticipantData, GetParticipantVariables>;
export function useGetParticipant(dc: DataConnect, vars: GetParticipantVariables, options?: useDataConnectQueryOptions<GetParticipantData>): UseDataConnectQueryResult<GetParticipantData, GetParticipantVariables>;

export function useListParticipants(vars: ListParticipantsVariables, options?: useDataConnectQueryOptions<ListParticipantsData>): UseDataConnectQueryResult<ListParticipantsData, ListParticipantsVariables>;
export function useListParticipants(dc: DataConnect, vars: ListParticipantsVariables, options?: useDataConnectQueryOptions<ListParticipantsData>): UseDataConnectQueryResult<ListParticipantsData, ListParticipantsVariables>;

export function useSendMessage(options?: useDataConnectMutationOptions<SendMessageData, FirebaseError, SendMessageVariables>): UseDataConnectMutationResult<SendMessageData, SendMessageVariables>;
export function useSendMessage(dc: DataConnect, options?: useDataConnectMutationOptions<SendMessageData, FirebaseError, SendMessageVariables>): UseDataConnectMutationResult<SendMessageData, SendMessageVariables>;

export function useDeleteMessage(options?: useDataConnectMutationOptions<DeleteMessageData, FirebaseError, DeleteMessageVariables>): UseDataConnectMutationResult<DeleteMessageData, DeleteMessageVariables>;
export function useDeleteMessage(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteMessageData, FirebaseError, DeleteMessageVariables>): UseDataConnectMutationResult<DeleteMessageData, DeleteMessageVariables>;

export function useListMessages(vars: ListMessagesVariables, options?: useDataConnectQueryOptions<ListMessagesData>): UseDataConnectQueryResult<ListMessagesData, ListMessagesVariables>;
export function useListMessages(dc: DataConnect, vars: ListMessagesVariables, options?: useDataConnectQueryOptions<ListMessagesData>): UseDataConnectQueryResult<ListMessagesData, ListMessagesVariables>;

export function useGiveFeedback(options?: useDataConnectMutationOptions<GiveFeedbackData, FirebaseError, GiveFeedbackVariables>): UseDataConnectMutationResult<GiveFeedbackData, GiveFeedbackVariables>;
export function useGiveFeedback(dc: DataConnect, options?: useDataConnectMutationOptions<GiveFeedbackData, FirebaseError, GiveFeedbackVariables>): UseDataConnectMutationResult<GiveFeedbackData, GiveFeedbackVariables>;

export function useDeleteFeedback(options?: useDataConnectMutationOptions<DeleteFeedbackData, FirebaseError, DeleteFeedbackVariables>): UseDataConnectMutationResult<DeleteFeedbackData, DeleteFeedbackVariables>;
export function useDeleteFeedback(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteFeedbackData, FirebaseError, DeleteFeedbackVariables>): UseDataConnectMutationResult<DeleteFeedbackData, DeleteFeedbackVariables>;

export function useListFeedbackForUser(vars: ListFeedbackForUserVariables, options?: useDataConnectQueryOptions<ListFeedbackForUserData>): UseDataConnectQueryResult<ListFeedbackForUserData, ListFeedbackForUserVariables>;
export function useListFeedbackForUser(dc: DataConnect, vars: ListFeedbackForUserVariables, options?: useDataConnectQueryOptions<ListFeedbackForUserData>): UseDataConnectQueryResult<ListFeedbackForUserData, ListFeedbackForUserVariables>;
