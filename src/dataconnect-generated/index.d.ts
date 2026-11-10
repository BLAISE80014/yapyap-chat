import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Conversation_Key {
  id: UUIDString;
  __typename?: 'Conversation_Key';
}

export interface CreateConversationData {
  conversation_insert: Conversation_Key;
}

export interface CreateConversationVariables {
  title: string;
  description: string;
  status: string;
  maxParticipants?: number | null;
  category?: string | null;
}

export interface CreateParticipantData {
  participant_insert: Participant_Key;
}

export interface CreateParticipantVariables {
  conversationId: UUIDString;
  role: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  displayName: string;
  email: string;
  bio: string;
  reputationScore?: number | null;
  interestTags?: string[] | null;
}

export interface DeleteConversationData {
  conversation_delete?: Conversation_Key | null;
}

export interface DeleteConversationVariables {
  id: UUIDString;
}

export interface DeleteFeedbackData {
  feedback_delete?: Feedback_Key | null;
}

export interface DeleteFeedbackVariables {
  id: UUIDString;
}

export interface DeleteMessageData {
  message_delete?: Message_Key | null;
}

export interface DeleteMessageVariables {
  id: UUIDString;
}

export interface DeleteParticipantData {
  participant_delete?: Participant_Key | null;
}

export interface DeleteParticipantVariables {
  conversationId: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface Feedback_Key {
  id: UUIDString;
  __typename?: 'Feedback_Key';
}

export interface GetConversationData {
  conversation?: {
    title: string;
    description: string;
    hostUser: {
      displayName: string;
    };
    status: string;
    category?: string | null;
  };
}

export interface GetConversationVariables {
  id: UUIDString;
}

export interface GetParticipantData {
  participant?: {
    role: string;
    joinedAt?: TimestampString | null;
  };
}

export interface GetParticipantVariables {
  conversationId: UUIDString;
}

export interface GetUserData {
  user?: {
    displayName: string;
    email: string;
    bio: string;
    reputationScore?: number | null;
    interestTags?: string[] | null;
  };
}

export interface GiveFeedbackData {
  feedback_insert: Feedback_Key;
}

export interface GiveFeedbackVariables {
  targetUserId: UUIDString;
  rating: number;
  comments?: string | null;
}

export interface ListConversationsData {
  conversations: ({
    id: UUIDString;
    title: string;
    status: string;
    category?: string | null;
  } & Conversation_Key)[];
}

export interface ListFeedbackForUserData {
  feedbacks: ({
    reviewer: {
      displayName: string;
    };
    rating: number;
    comments?: string | null;
  })[];
}

export interface ListFeedbackForUserVariables {
  targetUserId: UUIDString;
}

export interface ListMessagesData {
  messages: ({
    author: {
      displayName: string;
    };
    text: string;
    timestamp: TimestampString;
  })[];
}

export interface ListMessagesVariables {
  conversationId: UUIDString;
}

export interface ListParticipantsData {
  participants: ({
    user: {
      displayName: string;
    };
    role: string;
  })[];
}

export interface ListParticipantsVariables {
  conversationId: UUIDString;
}

export interface ListUsersData {
  users: ({
    id: UUIDString;
    displayName: string;
    reputationScore?: number | null;
  } & User_Key)[];
}

export interface Message_Key {
  id: UUIDString;
  __typename?: 'Message_Key';
}

export interface Participant_Key {
  userId: UUIDString;
  conversationId: UUIDString;
  __typename?: 'Participant_Key';
}

export interface SendMessageData {
  message_insert: Message_Key;
}

export interface SendMessageVariables {
  conversationId: UUIDString;
  text: string;
}

export interface UpdateConversationData {
  conversation_update?: Conversation_Key | null;
}

export interface UpdateConversationVariables {
  id: UUIDString;
  title?: string | null;
  description?: string | null;
  status?: string | null;
}

export interface UpdateParticipantData {
  participant_update?: Participant_Key | null;
}

export interface UpdateParticipantVariables {
  conversationId: UUIDString;
  role: string;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface UpdateUserVariables {
  displayName?: string | null;
  bio?: string | null;
  reputationScore?: number | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;
export function getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface CreateConversationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateConversationVariables): MutationRef<CreateConversationData, CreateConversationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateConversationVariables): MutationRef<CreateConversationData, CreateConversationVariables>;
  operationName: string;
}
export const createConversationRef: CreateConversationRef;

export function createConversation(vars: CreateConversationVariables): MutationPromise<CreateConversationData, CreateConversationVariables>;
export function createConversation(dc: DataConnect, vars: CreateConversationVariables): MutationPromise<CreateConversationData, CreateConversationVariables>;

interface UpdateConversationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateConversationVariables): MutationRef<UpdateConversationData, UpdateConversationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateConversationVariables): MutationRef<UpdateConversationData, UpdateConversationVariables>;
  operationName: string;
}
export const updateConversationRef: UpdateConversationRef;

export function updateConversation(vars: UpdateConversationVariables): MutationPromise<UpdateConversationData, UpdateConversationVariables>;
export function updateConversation(dc: DataConnect, vars: UpdateConversationVariables): MutationPromise<UpdateConversationData, UpdateConversationVariables>;

interface DeleteConversationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteConversationVariables): MutationRef<DeleteConversationData, DeleteConversationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteConversationVariables): MutationRef<DeleteConversationData, DeleteConversationVariables>;
  operationName: string;
}
export const deleteConversationRef: DeleteConversationRef;

export function deleteConversation(vars: DeleteConversationVariables): MutationPromise<DeleteConversationData, DeleteConversationVariables>;
export function deleteConversation(dc: DataConnect, vars: DeleteConversationVariables): MutationPromise<DeleteConversationData, DeleteConversationVariables>;

interface GetConversationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetConversationVariables): QueryRef<GetConversationData, GetConversationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetConversationVariables): QueryRef<GetConversationData, GetConversationVariables>;
  operationName: string;
}
export const getConversationRef: GetConversationRef;

export function getConversation(vars: GetConversationVariables, options?: ExecuteQueryOptions): QueryPromise<GetConversationData, GetConversationVariables>;
export function getConversation(dc: DataConnect, vars: GetConversationVariables, options?: ExecuteQueryOptions): QueryPromise<GetConversationData, GetConversationVariables>;

interface ListConversationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListConversationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListConversationsData, undefined>;
  operationName: string;
}
export const listConversationsRef: ListConversationsRef;

export function listConversations(options?: ExecuteQueryOptions): QueryPromise<ListConversationsData, undefined>;
export function listConversations(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListConversationsData, undefined>;

interface CreateParticipantRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateParticipantVariables): MutationRef<CreateParticipantData, CreateParticipantVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateParticipantVariables): MutationRef<CreateParticipantData, CreateParticipantVariables>;
  operationName: string;
}
export const createParticipantRef: CreateParticipantRef;

export function createParticipant(vars: CreateParticipantVariables): MutationPromise<CreateParticipantData, CreateParticipantVariables>;
export function createParticipant(dc: DataConnect, vars: CreateParticipantVariables): MutationPromise<CreateParticipantData, CreateParticipantVariables>;

interface UpdateParticipantRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateParticipantVariables): MutationRef<UpdateParticipantData, UpdateParticipantVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateParticipantVariables): MutationRef<UpdateParticipantData, UpdateParticipantVariables>;
  operationName: string;
}
export const updateParticipantRef: UpdateParticipantRef;

export function updateParticipant(vars: UpdateParticipantVariables): MutationPromise<UpdateParticipantData, UpdateParticipantVariables>;
export function updateParticipant(dc: DataConnect, vars: UpdateParticipantVariables): MutationPromise<UpdateParticipantData, UpdateParticipantVariables>;

interface DeleteParticipantRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteParticipantVariables): MutationRef<DeleteParticipantData, DeleteParticipantVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteParticipantVariables): MutationRef<DeleteParticipantData, DeleteParticipantVariables>;
  operationName: string;
}
export const deleteParticipantRef: DeleteParticipantRef;

export function deleteParticipant(vars: DeleteParticipantVariables): MutationPromise<DeleteParticipantData, DeleteParticipantVariables>;
export function deleteParticipant(dc: DataConnect, vars: DeleteParticipantVariables): MutationPromise<DeleteParticipantData, DeleteParticipantVariables>;

interface GetParticipantRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetParticipantVariables): QueryRef<GetParticipantData, GetParticipantVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetParticipantVariables): QueryRef<GetParticipantData, GetParticipantVariables>;
  operationName: string;
}
export const getParticipantRef: GetParticipantRef;

export function getParticipant(vars: GetParticipantVariables, options?: ExecuteQueryOptions): QueryPromise<GetParticipantData, GetParticipantVariables>;
export function getParticipant(dc: DataConnect, vars: GetParticipantVariables, options?: ExecuteQueryOptions): QueryPromise<GetParticipantData, GetParticipantVariables>;

interface ListParticipantsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListParticipantsVariables): QueryRef<ListParticipantsData, ListParticipantsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListParticipantsVariables): QueryRef<ListParticipantsData, ListParticipantsVariables>;
  operationName: string;
}
export const listParticipantsRef: ListParticipantsRef;

export function listParticipants(vars: ListParticipantsVariables, options?: ExecuteQueryOptions): QueryPromise<ListParticipantsData, ListParticipantsVariables>;
export function listParticipants(dc: DataConnect, vars: ListParticipantsVariables, options?: ExecuteQueryOptions): QueryPromise<ListParticipantsData, ListParticipantsVariables>;

interface SendMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SendMessageVariables): MutationRef<SendMessageData, SendMessageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SendMessageVariables): MutationRef<SendMessageData, SendMessageVariables>;
  operationName: string;
}
export const sendMessageRef: SendMessageRef;

export function sendMessage(vars: SendMessageVariables): MutationPromise<SendMessageData, SendMessageVariables>;
export function sendMessage(dc: DataConnect, vars: SendMessageVariables): MutationPromise<SendMessageData, SendMessageVariables>;

interface DeleteMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMessageVariables): MutationRef<DeleteMessageData, DeleteMessageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMessageVariables): MutationRef<DeleteMessageData, DeleteMessageVariables>;
  operationName: string;
}
export const deleteMessageRef: DeleteMessageRef;

export function deleteMessage(vars: DeleteMessageVariables): MutationPromise<DeleteMessageData, DeleteMessageVariables>;
export function deleteMessage(dc: DataConnect, vars: DeleteMessageVariables): MutationPromise<DeleteMessageData, DeleteMessageVariables>;

interface ListMessagesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMessagesVariables): QueryRef<ListMessagesData, ListMessagesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListMessagesVariables): QueryRef<ListMessagesData, ListMessagesVariables>;
  operationName: string;
}
export const listMessagesRef: ListMessagesRef;

export function listMessages(vars: ListMessagesVariables, options?: ExecuteQueryOptions): QueryPromise<ListMessagesData, ListMessagesVariables>;
export function listMessages(dc: DataConnect, vars: ListMessagesVariables, options?: ExecuteQueryOptions): QueryPromise<ListMessagesData, ListMessagesVariables>;

interface GiveFeedbackRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GiveFeedbackVariables): MutationRef<GiveFeedbackData, GiveFeedbackVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GiveFeedbackVariables): MutationRef<GiveFeedbackData, GiveFeedbackVariables>;
  operationName: string;
}
export const giveFeedbackRef: GiveFeedbackRef;

export function giveFeedback(vars: GiveFeedbackVariables): MutationPromise<GiveFeedbackData, GiveFeedbackVariables>;
export function giveFeedback(dc: DataConnect, vars: GiveFeedbackVariables): MutationPromise<GiveFeedbackData, GiveFeedbackVariables>;

interface DeleteFeedbackRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFeedbackVariables): MutationRef<DeleteFeedbackData, DeleteFeedbackVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteFeedbackVariables): MutationRef<DeleteFeedbackData, DeleteFeedbackVariables>;
  operationName: string;
}
export const deleteFeedbackRef: DeleteFeedbackRef;

export function deleteFeedback(vars: DeleteFeedbackVariables): MutationPromise<DeleteFeedbackData, DeleteFeedbackVariables>;
export function deleteFeedback(dc: DataConnect, vars: DeleteFeedbackVariables): MutationPromise<DeleteFeedbackData, DeleteFeedbackVariables>;

interface ListFeedbackForUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListFeedbackForUserVariables): QueryRef<ListFeedbackForUserData, ListFeedbackForUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListFeedbackForUserVariables): QueryRef<ListFeedbackForUserData, ListFeedbackForUserVariables>;
  operationName: string;
}
export const listFeedbackForUserRef: ListFeedbackForUserRef;

export function listFeedbackForUser(vars: ListFeedbackForUserVariables, options?: ExecuteQueryOptions): QueryPromise<ListFeedbackForUserData, ListFeedbackForUserVariables>;
export function listFeedbackForUser(dc: DataConnect, vars: ListFeedbackForUserVariables, options?: ExecuteQueryOptions): QueryPromise<ListFeedbackForUserData, ListFeedbackForUserVariables>;

