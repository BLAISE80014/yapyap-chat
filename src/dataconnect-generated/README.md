# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUser*](#getuser)
  - [*ListUsers*](#listusers)
  - [*GetConversation*](#getconversation)
  - [*ListConversations*](#listconversations)
  - [*GetParticipant*](#getparticipant)
  - [*ListParticipants*](#listparticipants)
  - [*ListMessages*](#listmessages)
  - [*ListFeedbackForUser*](#listfeedbackforuser)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateConversation*](#createconversation)
  - [*UpdateConversation*](#updateconversation)
  - [*DeleteConversation*](#deleteconversation)
  - [*CreateParticipant*](#createparticipant)
  - [*UpdateParticipant*](#updateparticipant)
  - [*DeleteParticipant*](#deleteparticipant)
  - [*SendMessage*](#sendmessage)
  - [*DeleteMessage*](#deletemessage)
  - [*GiveFeedback*](#givefeedback)
  - [*DeleteFeedback*](#deletefeedback)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query has no variables.
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserData {
  user?: {
    displayName: string;
    email: string;
    bio: string;
    reputationScore?: number | null;
    interestTags?: string[] | null;
  };
}
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser } from '@dataconnect/generated';


// Call the `getUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef } from '@dataconnect/generated';


// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    id: UUIDString;
    displayName: string;
    reputationScore?: number | null;
  } & User_Key)[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetConversation
You can execute the `GetConversation` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getConversation(vars: GetConversationVariables, options?: ExecuteQueryOptions): QueryPromise<GetConversationData, GetConversationVariables>;

interface GetConversationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetConversationVariables): QueryRef<GetConversationData, GetConversationVariables>;
}
export const getConversationRef: GetConversationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getConversation(dc: DataConnect, vars: GetConversationVariables, options?: ExecuteQueryOptions): QueryPromise<GetConversationData, GetConversationVariables>;

interface GetConversationRef {
  ...
  (dc: DataConnect, vars: GetConversationVariables): QueryRef<GetConversationData, GetConversationVariables>;
}
export const getConversationRef: GetConversationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getConversationRef:
```typescript
const name = getConversationRef.operationName;
console.log(name);
```

### Variables
The `GetConversation` query requires an argument of type `GetConversationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetConversationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetConversation` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetConversationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetConversation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getConversation, GetConversationVariables } from '@dataconnect/generated';

// The `GetConversation` query requires an argument of type `GetConversationVariables`:
const getConversationVars: GetConversationVariables = {
  id: ..., 
};

// Call the `getConversation()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getConversation(getConversationVars);
// Variables can be defined inline as well.
const { data } = await getConversation({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getConversation(dataConnect, getConversationVars);

console.log(data.conversation);

// Or, you can use the `Promise` API.
getConversation(getConversationVars).then((response) => {
  const data = response.data;
  console.log(data.conversation);
});
```

### Using `GetConversation`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getConversationRef, GetConversationVariables } from '@dataconnect/generated';

// The `GetConversation` query requires an argument of type `GetConversationVariables`:
const getConversationVars: GetConversationVariables = {
  id: ..., 
};

// Call the `getConversationRef()` function to get a reference to the query.
const ref = getConversationRef(getConversationVars);
// Variables can be defined inline as well.
const ref = getConversationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getConversationRef(dataConnect, getConversationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.conversation);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.conversation);
});
```

## ListConversations
You can execute the `ListConversations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listConversations(options?: ExecuteQueryOptions): QueryPromise<ListConversationsData, undefined>;

interface ListConversationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListConversationsData, undefined>;
}
export const listConversationsRef: ListConversationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listConversations(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListConversationsData, undefined>;

interface ListConversationsRef {
  ...
  (dc: DataConnect): QueryRef<ListConversationsData, undefined>;
}
export const listConversationsRef: ListConversationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listConversationsRef:
```typescript
const name = listConversationsRef.operationName;
console.log(name);
```

### Variables
The `ListConversations` query has no variables.
### Return Type
Recall that executing the `ListConversations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListConversationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListConversationsData {
  conversations: ({
    id: UUIDString;
    title: string;
    status: string;
    category?: string | null;
  } & Conversation_Key)[];
}
```
### Using `ListConversations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listConversations } from '@dataconnect/generated';


// Call the `listConversations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listConversations();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listConversations(dataConnect);

console.log(data.conversations);

// Or, you can use the `Promise` API.
listConversations().then((response) => {
  const data = response.data;
  console.log(data.conversations);
});
```

### Using `ListConversations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listConversationsRef } from '@dataconnect/generated';


// Call the `listConversationsRef()` function to get a reference to the query.
const ref = listConversationsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listConversationsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.conversations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.conversations);
});
```

## GetParticipant
You can execute the `GetParticipant` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getParticipant(vars: GetParticipantVariables, options?: ExecuteQueryOptions): QueryPromise<GetParticipantData, GetParticipantVariables>;

interface GetParticipantRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetParticipantVariables): QueryRef<GetParticipantData, GetParticipantVariables>;
}
export const getParticipantRef: GetParticipantRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getParticipant(dc: DataConnect, vars: GetParticipantVariables, options?: ExecuteQueryOptions): QueryPromise<GetParticipantData, GetParticipantVariables>;

interface GetParticipantRef {
  ...
  (dc: DataConnect, vars: GetParticipantVariables): QueryRef<GetParticipantData, GetParticipantVariables>;
}
export const getParticipantRef: GetParticipantRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getParticipantRef:
```typescript
const name = getParticipantRef.operationName;
console.log(name);
```

### Variables
The `GetParticipant` query requires an argument of type `GetParticipantVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetParticipantVariables {
  conversationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetParticipant` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetParticipantData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetParticipantData {
  participant?: {
    role: string;
    joinedAt?: TimestampString | null;
  };
}
```
### Using `GetParticipant`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getParticipant, GetParticipantVariables } from '@dataconnect/generated';

// The `GetParticipant` query requires an argument of type `GetParticipantVariables`:
const getParticipantVars: GetParticipantVariables = {
  conversationId: ..., 
};

// Call the `getParticipant()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getParticipant(getParticipantVars);
// Variables can be defined inline as well.
const { data } = await getParticipant({ conversationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getParticipant(dataConnect, getParticipantVars);

console.log(data.participant);

// Or, you can use the `Promise` API.
getParticipant(getParticipantVars).then((response) => {
  const data = response.data;
  console.log(data.participant);
});
```

### Using `GetParticipant`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getParticipantRef, GetParticipantVariables } from '@dataconnect/generated';

// The `GetParticipant` query requires an argument of type `GetParticipantVariables`:
const getParticipantVars: GetParticipantVariables = {
  conversationId: ..., 
};

// Call the `getParticipantRef()` function to get a reference to the query.
const ref = getParticipantRef(getParticipantVars);
// Variables can be defined inline as well.
const ref = getParticipantRef({ conversationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getParticipantRef(dataConnect, getParticipantVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.participant);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.participant);
});
```

## ListParticipants
You can execute the `ListParticipants` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listParticipants(vars: ListParticipantsVariables, options?: ExecuteQueryOptions): QueryPromise<ListParticipantsData, ListParticipantsVariables>;

interface ListParticipantsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListParticipantsVariables): QueryRef<ListParticipantsData, ListParticipantsVariables>;
}
export const listParticipantsRef: ListParticipantsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listParticipants(dc: DataConnect, vars: ListParticipantsVariables, options?: ExecuteQueryOptions): QueryPromise<ListParticipantsData, ListParticipantsVariables>;

interface ListParticipantsRef {
  ...
  (dc: DataConnect, vars: ListParticipantsVariables): QueryRef<ListParticipantsData, ListParticipantsVariables>;
}
export const listParticipantsRef: ListParticipantsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listParticipantsRef:
```typescript
const name = listParticipantsRef.operationName;
console.log(name);
```

### Variables
The `ListParticipants` query requires an argument of type `ListParticipantsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListParticipantsVariables {
  conversationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListParticipants` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListParticipantsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListParticipantsData {
  participants: ({
    user: {
      displayName: string;
    };
    role: string;
  })[];
}
```
### Using `ListParticipants`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listParticipants, ListParticipantsVariables } from '@dataconnect/generated';

// The `ListParticipants` query requires an argument of type `ListParticipantsVariables`:
const listParticipantsVars: ListParticipantsVariables = {
  conversationId: ..., 
};

// Call the `listParticipants()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listParticipants(listParticipantsVars);
// Variables can be defined inline as well.
const { data } = await listParticipants({ conversationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listParticipants(dataConnect, listParticipantsVars);

console.log(data.participants);

// Or, you can use the `Promise` API.
listParticipants(listParticipantsVars).then((response) => {
  const data = response.data;
  console.log(data.participants);
});
```

### Using `ListParticipants`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listParticipantsRef, ListParticipantsVariables } from '@dataconnect/generated';

// The `ListParticipants` query requires an argument of type `ListParticipantsVariables`:
const listParticipantsVars: ListParticipantsVariables = {
  conversationId: ..., 
};

// Call the `listParticipantsRef()` function to get a reference to the query.
const ref = listParticipantsRef(listParticipantsVars);
// Variables can be defined inline as well.
const ref = listParticipantsRef({ conversationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listParticipantsRef(dataConnect, listParticipantsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.participants);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.participants);
});
```

## ListMessages
You can execute the `ListMessages` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMessages(vars: ListMessagesVariables, options?: ExecuteQueryOptions): QueryPromise<ListMessagesData, ListMessagesVariables>;

interface ListMessagesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMessagesVariables): QueryRef<ListMessagesData, ListMessagesVariables>;
}
export const listMessagesRef: ListMessagesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMessages(dc: DataConnect, vars: ListMessagesVariables, options?: ExecuteQueryOptions): QueryPromise<ListMessagesData, ListMessagesVariables>;

interface ListMessagesRef {
  ...
  (dc: DataConnect, vars: ListMessagesVariables): QueryRef<ListMessagesData, ListMessagesVariables>;
}
export const listMessagesRef: ListMessagesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMessagesRef:
```typescript
const name = listMessagesRef.operationName;
console.log(name);
```

### Variables
The `ListMessages` query requires an argument of type `ListMessagesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMessagesVariables {
  conversationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListMessages` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMessagesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMessagesData {
  messages: ({
    author: {
      displayName: string;
    };
    text: string;
    timestamp: TimestampString;
  })[];
}
```
### Using `ListMessages`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMessages, ListMessagesVariables } from '@dataconnect/generated';

// The `ListMessages` query requires an argument of type `ListMessagesVariables`:
const listMessagesVars: ListMessagesVariables = {
  conversationId: ..., 
};

// Call the `listMessages()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMessages(listMessagesVars);
// Variables can be defined inline as well.
const { data } = await listMessages({ conversationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMessages(dataConnect, listMessagesVars);

console.log(data.messages);

// Or, you can use the `Promise` API.
listMessages(listMessagesVars).then((response) => {
  const data = response.data;
  console.log(data.messages);
});
```

### Using `ListMessages`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMessagesRef, ListMessagesVariables } from '@dataconnect/generated';

// The `ListMessages` query requires an argument of type `ListMessagesVariables`:
const listMessagesVars: ListMessagesVariables = {
  conversationId: ..., 
};

// Call the `listMessagesRef()` function to get a reference to the query.
const ref = listMessagesRef(listMessagesVars);
// Variables can be defined inline as well.
const ref = listMessagesRef({ conversationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMessagesRef(dataConnect, listMessagesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.messages);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.messages);
});
```

## ListFeedbackForUser
You can execute the `ListFeedbackForUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listFeedbackForUser(vars: ListFeedbackForUserVariables, options?: ExecuteQueryOptions): QueryPromise<ListFeedbackForUserData, ListFeedbackForUserVariables>;

interface ListFeedbackForUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListFeedbackForUserVariables): QueryRef<ListFeedbackForUserData, ListFeedbackForUserVariables>;
}
export const listFeedbackForUserRef: ListFeedbackForUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listFeedbackForUser(dc: DataConnect, vars: ListFeedbackForUserVariables, options?: ExecuteQueryOptions): QueryPromise<ListFeedbackForUserData, ListFeedbackForUserVariables>;

interface ListFeedbackForUserRef {
  ...
  (dc: DataConnect, vars: ListFeedbackForUserVariables): QueryRef<ListFeedbackForUserData, ListFeedbackForUserVariables>;
}
export const listFeedbackForUserRef: ListFeedbackForUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listFeedbackForUserRef:
```typescript
const name = listFeedbackForUserRef.operationName;
console.log(name);
```

### Variables
The `ListFeedbackForUser` query requires an argument of type `ListFeedbackForUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListFeedbackForUserVariables {
  targetUserId: UUIDString;
}
```
### Return Type
Recall that executing the `ListFeedbackForUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListFeedbackForUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListFeedbackForUserData {
  feedbacks: ({
    reviewer: {
      displayName: string;
    };
    rating: number;
    comments?: string | null;
  })[];
}
```
### Using `ListFeedbackForUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listFeedbackForUser, ListFeedbackForUserVariables } from '@dataconnect/generated';

// The `ListFeedbackForUser` query requires an argument of type `ListFeedbackForUserVariables`:
const listFeedbackForUserVars: ListFeedbackForUserVariables = {
  targetUserId: ..., 
};

// Call the `listFeedbackForUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listFeedbackForUser(listFeedbackForUserVars);
// Variables can be defined inline as well.
const { data } = await listFeedbackForUser({ targetUserId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listFeedbackForUser(dataConnect, listFeedbackForUserVars);

console.log(data.feedbacks);

// Or, you can use the `Promise` API.
listFeedbackForUser(listFeedbackForUserVars).then((response) => {
  const data = response.data;
  console.log(data.feedbacks);
});
```

### Using `ListFeedbackForUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listFeedbackForUserRef, ListFeedbackForUserVariables } from '@dataconnect/generated';

// The `ListFeedbackForUser` query requires an argument of type `ListFeedbackForUserVariables`:
const listFeedbackForUserVars: ListFeedbackForUserVariables = {
  targetUserId: ..., 
};

// Call the `listFeedbackForUserRef()` function to get a reference to the query.
const ref = listFeedbackForUserRef(listFeedbackForUserVars);
// Variables can be defined inline as well.
const ref = listFeedbackForUserRef({ targetUserId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listFeedbackForUserRef(dataConnect, listFeedbackForUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.feedbacks);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.feedbacks);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  displayName: string;
  email: string;
  bio: string;
  reputationScore?: number | null;
  interestTags?: string[] | null;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  displayName: ..., 
  email: ..., 
  bio: ..., 
  reputationScore: ..., // optional
  interestTags: ..., // optional
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ displayName: ..., email: ..., bio: ..., reputationScore: ..., interestTags: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  displayName: ..., 
  email: ..., 
  bio: ..., 
  reputationScore: ..., // optional
  interestTags: ..., // optional
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ displayName: ..., email: ..., bio: ..., reputationScore: ..., interestTags: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserVariables {
  displayName?: string | null;
  bio?: string | null;
  reputationScore?: number | null;
}
```
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  displayName: ..., // optional
  bio: ..., // optional
  reputationScore: ..., // optional
};

// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser(updateUserVars);
// Variables can be defined inline as well.
const { data } = await updateUser({ displayName: ..., bio: ..., reputationScore: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const { data } = await updateUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect, updateUserVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser(updateUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  displayName: ..., // optional
  bio: ..., // optional
  reputationScore: ..., // optional
};

// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef(updateUserVars);
// Variables can be defined inline as well.
const ref = updateUserRef({ displayName: ..., bio: ..., reputationScore: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const ref = updateUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect, updateUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateConversation
You can execute the `CreateConversation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createConversation(vars: CreateConversationVariables): MutationPromise<CreateConversationData, CreateConversationVariables>;

interface CreateConversationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateConversationVariables): MutationRef<CreateConversationData, CreateConversationVariables>;
}
export const createConversationRef: CreateConversationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createConversation(dc: DataConnect, vars: CreateConversationVariables): MutationPromise<CreateConversationData, CreateConversationVariables>;

interface CreateConversationRef {
  ...
  (dc: DataConnect, vars: CreateConversationVariables): MutationRef<CreateConversationData, CreateConversationVariables>;
}
export const createConversationRef: CreateConversationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createConversationRef:
```typescript
const name = createConversationRef.operationName;
console.log(name);
```

### Variables
The `CreateConversation` mutation requires an argument of type `CreateConversationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateConversationVariables {
  title: string;
  description: string;
  status: string;
  maxParticipants?: number | null;
  category?: string | null;
}
```
### Return Type
Recall that executing the `CreateConversation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateConversationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateConversationData {
  conversation_insert: Conversation_Key;
}
```
### Using `CreateConversation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createConversation, CreateConversationVariables } from '@dataconnect/generated';

// The `CreateConversation` mutation requires an argument of type `CreateConversationVariables`:
const createConversationVars: CreateConversationVariables = {
  title: ..., 
  description: ..., 
  status: ..., 
  maxParticipants: ..., // optional
  category: ..., // optional
};

// Call the `createConversation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createConversation(createConversationVars);
// Variables can be defined inline as well.
const { data } = await createConversation({ title: ..., description: ..., status: ..., maxParticipants: ..., category: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createConversation(dataConnect, createConversationVars);

console.log(data.conversation_insert);

// Or, you can use the `Promise` API.
createConversation(createConversationVars).then((response) => {
  const data = response.data;
  console.log(data.conversation_insert);
});
```

### Using `CreateConversation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createConversationRef, CreateConversationVariables } from '@dataconnect/generated';

// The `CreateConversation` mutation requires an argument of type `CreateConversationVariables`:
const createConversationVars: CreateConversationVariables = {
  title: ..., 
  description: ..., 
  status: ..., 
  maxParticipants: ..., // optional
  category: ..., // optional
};

// Call the `createConversationRef()` function to get a reference to the mutation.
const ref = createConversationRef(createConversationVars);
// Variables can be defined inline as well.
const ref = createConversationRef({ title: ..., description: ..., status: ..., maxParticipants: ..., category: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createConversationRef(dataConnect, createConversationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.conversation_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.conversation_insert);
});
```

## UpdateConversation
You can execute the `UpdateConversation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateConversation(vars: UpdateConversationVariables): MutationPromise<UpdateConversationData, UpdateConversationVariables>;

interface UpdateConversationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateConversationVariables): MutationRef<UpdateConversationData, UpdateConversationVariables>;
}
export const updateConversationRef: UpdateConversationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateConversation(dc: DataConnect, vars: UpdateConversationVariables): MutationPromise<UpdateConversationData, UpdateConversationVariables>;

interface UpdateConversationRef {
  ...
  (dc: DataConnect, vars: UpdateConversationVariables): MutationRef<UpdateConversationData, UpdateConversationVariables>;
}
export const updateConversationRef: UpdateConversationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateConversationRef:
```typescript
const name = updateConversationRef.operationName;
console.log(name);
```

### Variables
The `UpdateConversation` mutation requires an argument of type `UpdateConversationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateConversationVariables {
  id: UUIDString;
  title?: string | null;
  description?: string | null;
  status?: string | null;
}
```
### Return Type
Recall that executing the `UpdateConversation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateConversationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateConversationData {
  conversation_update?: Conversation_Key | null;
}
```
### Using `UpdateConversation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateConversation, UpdateConversationVariables } from '@dataconnect/generated';

// The `UpdateConversation` mutation requires an argument of type `UpdateConversationVariables`:
const updateConversationVars: UpdateConversationVariables = {
  id: ..., 
  title: ..., // optional
  description: ..., // optional
  status: ..., // optional
};

// Call the `updateConversation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateConversation(updateConversationVars);
// Variables can be defined inline as well.
const { data } = await updateConversation({ id: ..., title: ..., description: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateConversation(dataConnect, updateConversationVars);

console.log(data.conversation_update);

// Or, you can use the `Promise` API.
updateConversation(updateConversationVars).then((response) => {
  const data = response.data;
  console.log(data.conversation_update);
});
```

### Using `UpdateConversation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateConversationRef, UpdateConversationVariables } from '@dataconnect/generated';

// The `UpdateConversation` mutation requires an argument of type `UpdateConversationVariables`:
const updateConversationVars: UpdateConversationVariables = {
  id: ..., 
  title: ..., // optional
  description: ..., // optional
  status: ..., // optional
};

// Call the `updateConversationRef()` function to get a reference to the mutation.
const ref = updateConversationRef(updateConversationVars);
// Variables can be defined inline as well.
const ref = updateConversationRef({ id: ..., title: ..., description: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateConversationRef(dataConnect, updateConversationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.conversation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.conversation_update);
});
```

## DeleteConversation
You can execute the `DeleteConversation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteConversation(vars: DeleteConversationVariables): MutationPromise<DeleteConversationData, DeleteConversationVariables>;

interface DeleteConversationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteConversationVariables): MutationRef<DeleteConversationData, DeleteConversationVariables>;
}
export const deleteConversationRef: DeleteConversationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteConversation(dc: DataConnect, vars: DeleteConversationVariables): MutationPromise<DeleteConversationData, DeleteConversationVariables>;

interface DeleteConversationRef {
  ...
  (dc: DataConnect, vars: DeleteConversationVariables): MutationRef<DeleteConversationData, DeleteConversationVariables>;
}
export const deleteConversationRef: DeleteConversationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteConversationRef:
```typescript
const name = deleteConversationRef.operationName;
console.log(name);
```

### Variables
The `DeleteConversation` mutation requires an argument of type `DeleteConversationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteConversationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteConversation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteConversationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteConversationData {
  conversation_delete?: Conversation_Key | null;
}
```
### Using `DeleteConversation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteConversation, DeleteConversationVariables } from '@dataconnect/generated';

// The `DeleteConversation` mutation requires an argument of type `DeleteConversationVariables`:
const deleteConversationVars: DeleteConversationVariables = {
  id: ..., 
};

// Call the `deleteConversation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteConversation(deleteConversationVars);
// Variables can be defined inline as well.
const { data } = await deleteConversation({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteConversation(dataConnect, deleteConversationVars);

console.log(data.conversation_delete);

// Or, you can use the `Promise` API.
deleteConversation(deleteConversationVars).then((response) => {
  const data = response.data;
  console.log(data.conversation_delete);
});
```

### Using `DeleteConversation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteConversationRef, DeleteConversationVariables } from '@dataconnect/generated';

// The `DeleteConversation` mutation requires an argument of type `DeleteConversationVariables`:
const deleteConversationVars: DeleteConversationVariables = {
  id: ..., 
};

// Call the `deleteConversationRef()` function to get a reference to the mutation.
const ref = deleteConversationRef(deleteConversationVars);
// Variables can be defined inline as well.
const ref = deleteConversationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteConversationRef(dataConnect, deleteConversationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.conversation_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.conversation_delete);
});
```

## CreateParticipant
You can execute the `CreateParticipant` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createParticipant(vars: CreateParticipantVariables): MutationPromise<CreateParticipantData, CreateParticipantVariables>;

interface CreateParticipantRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateParticipantVariables): MutationRef<CreateParticipantData, CreateParticipantVariables>;
}
export const createParticipantRef: CreateParticipantRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createParticipant(dc: DataConnect, vars: CreateParticipantVariables): MutationPromise<CreateParticipantData, CreateParticipantVariables>;

interface CreateParticipantRef {
  ...
  (dc: DataConnect, vars: CreateParticipantVariables): MutationRef<CreateParticipantData, CreateParticipantVariables>;
}
export const createParticipantRef: CreateParticipantRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createParticipantRef:
```typescript
const name = createParticipantRef.operationName;
console.log(name);
```

### Variables
The `CreateParticipant` mutation requires an argument of type `CreateParticipantVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateParticipantVariables {
  conversationId: UUIDString;
  role: string;
}
```
### Return Type
Recall that executing the `CreateParticipant` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateParticipantData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateParticipantData {
  participant_insert: Participant_Key;
}
```
### Using `CreateParticipant`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createParticipant, CreateParticipantVariables } from '@dataconnect/generated';

// The `CreateParticipant` mutation requires an argument of type `CreateParticipantVariables`:
const createParticipantVars: CreateParticipantVariables = {
  conversationId: ..., 
  role: ..., 
};

// Call the `createParticipant()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createParticipant(createParticipantVars);
// Variables can be defined inline as well.
const { data } = await createParticipant({ conversationId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createParticipant(dataConnect, createParticipantVars);

console.log(data.participant_insert);

// Or, you can use the `Promise` API.
createParticipant(createParticipantVars).then((response) => {
  const data = response.data;
  console.log(data.participant_insert);
});
```

### Using `CreateParticipant`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createParticipantRef, CreateParticipantVariables } from '@dataconnect/generated';

// The `CreateParticipant` mutation requires an argument of type `CreateParticipantVariables`:
const createParticipantVars: CreateParticipantVariables = {
  conversationId: ..., 
  role: ..., 
};

// Call the `createParticipantRef()` function to get a reference to the mutation.
const ref = createParticipantRef(createParticipantVars);
// Variables can be defined inline as well.
const ref = createParticipantRef({ conversationId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createParticipantRef(dataConnect, createParticipantVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.participant_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.participant_insert);
});
```

## UpdateParticipant
You can execute the `UpdateParticipant` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateParticipant(vars: UpdateParticipantVariables): MutationPromise<UpdateParticipantData, UpdateParticipantVariables>;

interface UpdateParticipantRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateParticipantVariables): MutationRef<UpdateParticipantData, UpdateParticipantVariables>;
}
export const updateParticipantRef: UpdateParticipantRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateParticipant(dc: DataConnect, vars: UpdateParticipantVariables): MutationPromise<UpdateParticipantData, UpdateParticipantVariables>;

interface UpdateParticipantRef {
  ...
  (dc: DataConnect, vars: UpdateParticipantVariables): MutationRef<UpdateParticipantData, UpdateParticipantVariables>;
}
export const updateParticipantRef: UpdateParticipantRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateParticipantRef:
```typescript
const name = updateParticipantRef.operationName;
console.log(name);
```

### Variables
The `UpdateParticipant` mutation requires an argument of type `UpdateParticipantVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateParticipantVariables {
  conversationId: UUIDString;
  role: string;
}
```
### Return Type
Recall that executing the `UpdateParticipant` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateParticipantData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateParticipantData {
  participant_update?: Participant_Key | null;
}
```
### Using `UpdateParticipant`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateParticipant, UpdateParticipantVariables } from '@dataconnect/generated';

// The `UpdateParticipant` mutation requires an argument of type `UpdateParticipantVariables`:
const updateParticipantVars: UpdateParticipantVariables = {
  conversationId: ..., 
  role: ..., 
};

// Call the `updateParticipant()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateParticipant(updateParticipantVars);
// Variables can be defined inline as well.
const { data } = await updateParticipant({ conversationId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateParticipant(dataConnect, updateParticipantVars);

console.log(data.participant_update);

// Or, you can use the `Promise` API.
updateParticipant(updateParticipantVars).then((response) => {
  const data = response.data;
  console.log(data.participant_update);
});
```

### Using `UpdateParticipant`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateParticipantRef, UpdateParticipantVariables } from '@dataconnect/generated';

// The `UpdateParticipant` mutation requires an argument of type `UpdateParticipantVariables`:
const updateParticipantVars: UpdateParticipantVariables = {
  conversationId: ..., 
  role: ..., 
};

// Call the `updateParticipantRef()` function to get a reference to the mutation.
const ref = updateParticipantRef(updateParticipantVars);
// Variables can be defined inline as well.
const ref = updateParticipantRef({ conversationId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateParticipantRef(dataConnect, updateParticipantVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.participant_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.participant_update);
});
```

## DeleteParticipant
You can execute the `DeleteParticipant` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteParticipant(vars: DeleteParticipantVariables): MutationPromise<DeleteParticipantData, DeleteParticipantVariables>;

interface DeleteParticipantRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteParticipantVariables): MutationRef<DeleteParticipantData, DeleteParticipantVariables>;
}
export const deleteParticipantRef: DeleteParticipantRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteParticipant(dc: DataConnect, vars: DeleteParticipantVariables): MutationPromise<DeleteParticipantData, DeleteParticipantVariables>;

interface DeleteParticipantRef {
  ...
  (dc: DataConnect, vars: DeleteParticipantVariables): MutationRef<DeleteParticipantData, DeleteParticipantVariables>;
}
export const deleteParticipantRef: DeleteParticipantRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteParticipantRef:
```typescript
const name = deleteParticipantRef.operationName;
console.log(name);
```

### Variables
The `DeleteParticipant` mutation requires an argument of type `DeleteParticipantVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteParticipantVariables {
  conversationId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteParticipant` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteParticipantData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteParticipantData {
  participant_delete?: Participant_Key | null;
}
```
### Using `DeleteParticipant`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteParticipant, DeleteParticipantVariables } from '@dataconnect/generated';

// The `DeleteParticipant` mutation requires an argument of type `DeleteParticipantVariables`:
const deleteParticipantVars: DeleteParticipantVariables = {
  conversationId: ..., 
};

// Call the `deleteParticipant()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteParticipant(deleteParticipantVars);
// Variables can be defined inline as well.
const { data } = await deleteParticipant({ conversationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteParticipant(dataConnect, deleteParticipantVars);

console.log(data.participant_delete);

// Or, you can use the `Promise` API.
deleteParticipant(deleteParticipantVars).then((response) => {
  const data = response.data;
  console.log(data.participant_delete);
});
```

### Using `DeleteParticipant`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteParticipantRef, DeleteParticipantVariables } from '@dataconnect/generated';

// The `DeleteParticipant` mutation requires an argument of type `DeleteParticipantVariables`:
const deleteParticipantVars: DeleteParticipantVariables = {
  conversationId: ..., 
};

// Call the `deleteParticipantRef()` function to get a reference to the mutation.
const ref = deleteParticipantRef(deleteParticipantVars);
// Variables can be defined inline as well.
const ref = deleteParticipantRef({ conversationId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteParticipantRef(dataConnect, deleteParticipantVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.participant_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.participant_delete);
});
```

## SendMessage
You can execute the `SendMessage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
sendMessage(vars: SendMessageVariables): MutationPromise<SendMessageData, SendMessageVariables>;

interface SendMessageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SendMessageVariables): MutationRef<SendMessageData, SendMessageVariables>;
}
export const sendMessageRef: SendMessageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
sendMessage(dc: DataConnect, vars: SendMessageVariables): MutationPromise<SendMessageData, SendMessageVariables>;

interface SendMessageRef {
  ...
  (dc: DataConnect, vars: SendMessageVariables): MutationRef<SendMessageData, SendMessageVariables>;
}
export const sendMessageRef: SendMessageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the sendMessageRef:
```typescript
const name = sendMessageRef.operationName;
console.log(name);
```

### Variables
The `SendMessage` mutation requires an argument of type `SendMessageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SendMessageVariables {
  conversationId: UUIDString;
  text: string;
}
```
### Return Type
Recall that executing the `SendMessage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SendMessageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SendMessageData {
  message_insert: Message_Key;
}
```
### Using `SendMessage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, sendMessage, SendMessageVariables } from '@dataconnect/generated';

// The `SendMessage` mutation requires an argument of type `SendMessageVariables`:
const sendMessageVars: SendMessageVariables = {
  conversationId: ..., 
  text: ..., 
};

// Call the `sendMessage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await sendMessage(sendMessageVars);
// Variables can be defined inline as well.
const { data } = await sendMessage({ conversationId: ..., text: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await sendMessage(dataConnect, sendMessageVars);

console.log(data.message_insert);

// Or, you can use the `Promise` API.
sendMessage(sendMessageVars).then((response) => {
  const data = response.data;
  console.log(data.message_insert);
});
```

### Using `SendMessage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, sendMessageRef, SendMessageVariables } from '@dataconnect/generated';

// The `SendMessage` mutation requires an argument of type `SendMessageVariables`:
const sendMessageVars: SendMessageVariables = {
  conversationId: ..., 
  text: ..., 
};

// Call the `sendMessageRef()` function to get a reference to the mutation.
const ref = sendMessageRef(sendMessageVars);
// Variables can be defined inline as well.
const ref = sendMessageRef({ conversationId: ..., text: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = sendMessageRef(dataConnect, sendMessageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.message_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.message_insert);
});
```

## DeleteMessage
You can execute the `DeleteMessage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMessage(vars: DeleteMessageVariables): MutationPromise<DeleteMessageData, DeleteMessageVariables>;

interface DeleteMessageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMessageVariables): MutationRef<DeleteMessageData, DeleteMessageVariables>;
}
export const deleteMessageRef: DeleteMessageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMessage(dc: DataConnect, vars: DeleteMessageVariables): MutationPromise<DeleteMessageData, DeleteMessageVariables>;

interface DeleteMessageRef {
  ...
  (dc: DataConnect, vars: DeleteMessageVariables): MutationRef<DeleteMessageData, DeleteMessageVariables>;
}
export const deleteMessageRef: DeleteMessageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMessageRef:
```typescript
const name = deleteMessageRef.operationName;
console.log(name);
```

### Variables
The `DeleteMessage` mutation requires an argument of type `DeleteMessageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMessageVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteMessage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMessageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMessageData {
  message_delete?: Message_Key | null;
}
```
### Using `DeleteMessage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMessage, DeleteMessageVariables } from '@dataconnect/generated';

// The `DeleteMessage` mutation requires an argument of type `DeleteMessageVariables`:
const deleteMessageVars: DeleteMessageVariables = {
  id: ..., 
};

// Call the `deleteMessage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMessage(deleteMessageVars);
// Variables can be defined inline as well.
const { data } = await deleteMessage({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMessage(dataConnect, deleteMessageVars);

console.log(data.message_delete);

// Or, you can use the `Promise` API.
deleteMessage(deleteMessageVars).then((response) => {
  const data = response.data;
  console.log(data.message_delete);
});
```

### Using `DeleteMessage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMessageRef, DeleteMessageVariables } from '@dataconnect/generated';

// The `DeleteMessage` mutation requires an argument of type `DeleteMessageVariables`:
const deleteMessageVars: DeleteMessageVariables = {
  id: ..., 
};

// Call the `deleteMessageRef()` function to get a reference to the mutation.
const ref = deleteMessageRef(deleteMessageVars);
// Variables can be defined inline as well.
const ref = deleteMessageRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMessageRef(dataConnect, deleteMessageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.message_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.message_delete);
});
```

## GiveFeedback
You can execute the `GiveFeedback` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
giveFeedback(vars: GiveFeedbackVariables): MutationPromise<GiveFeedbackData, GiveFeedbackVariables>;

interface GiveFeedbackRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GiveFeedbackVariables): MutationRef<GiveFeedbackData, GiveFeedbackVariables>;
}
export const giveFeedbackRef: GiveFeedbackRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
giveFeedback(dc: DataConnect, vars: GiveFeedbackVariables): MutationPromise<GiveFeedbackData, GiveFeedbackVariables>;

interface GiveFeedbackRef {
  ...
  (dc: DataConnect, vars: GiveFeedbackVariables): MutationRef<GiveFeedbackData, GiveFeedbackVariables>;
}
export const giveFeedbackRef: GiveFeedbackRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the giveFeedbackRef:
```typescript
const name = giveFeedbackRef.operationName;
console.log(name);
```

### Variables
The `GiveFeedback` mutation requires an argument of type `GiveFeedbackVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GiveFeedbackVariables {
  targetUserId: UUIDString;
  rating: number;
  comments?: string | null;
}
```
### Return Type
Recall that executing the `GiveFeedback` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GiveFeedbackData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GiveFeedbackData {
  feedback_insert: Feedback_Key;
}
```
### Using `GiveFeedback`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, giveFeedback, GiveFeedbackVariables } from '@dataconnect/generated';

// The `GiveFeedback` mutation requires an argument of type `GiveFeedbackVariables`:
const giveFeedbackVars: GiveFeedbackVariables = {
  targetUserId: ..., 
  rating: ..., 
  comments: ..., // optional
};

// Call the `giveFeedback()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await giveFeedback(giveFeedbackVars);
// Variables can be defined inline as well.
const { data } = await giveFeedback({ targetUserId: ..., rating: ..., comments: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await giveFeedback(dataConnect, giveFeedbackVars);

console.log(data.feedback_insert);

// Or, you can use the `Promise` API.
giveFeedback(giveFeedbackVars).then((response) => {
  const data = response.data;
  console.log(data.feedback_insert);
});
```

### Using `GiveFeedback`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, giveFeedbackRef, GiveFeedbackVariables } from '@dataconnect/generated';

// The `GiveFeedback` mutation requires an argument of type `GiveFeedbackVariables`:
const giveFeedbackVars: GiveFeedbackVariables = {
  targetUserId: ..., 
  rating: ..., 
  comments: ..., // optional
};

// Call the `giveFeedbackRef()` function to get a reference to the mutation.
const ref = giveFeedbackRef(giveFeedbackVars);
// Variables can be defined inline as well.
const ref = giveFeedbackRef({ targetUserId: ..., rating: ..., comments: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = giveFeedbackRef(dataConnect, giveFeedbackVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.feedback_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.feedback_insert);
});
```

## DeleteFeedback
You can execute the `DeleteFeedback` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteFeedback(vars: DeleteFeedbackVariables): MutationPromise<DeleteFeedbackData, DeleteFeedbackVariables>;

interface DeleteFeedbackRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFeedbackVariables): MutationRef<DeleteFeedbackData, DeleteFeedbackVariables>;
}
export const deleteFeedbackRef: DeleteFeedbackRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteFeedback(dc: DataConnect, vars: DeleteFeedbackVariables): MutationPromise<DeleteFeedbackData, DeleteFeedbackVariables>;

interface DeleteFeedbackRef {
  ...
  (dc: DataConnect, vars: DeleteFeedbackVariables): MutationRef<DeleteFeedbackData, DeleteFeedbackVariables>;
}
export const deleteFeedbackRef: DeleteFeedbackRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteFeedbackRef:
```typescript
const name = deleteFeedbackRef.operationName;
console.log(name);
```

### Variables
The `DeleteFeedback` mutation requires an argument of type `DeleteFeedbackVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteFeedbackVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteFeedback` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteFeedbackData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteFeedbackData {
  feedback_delete?: Feedback_Key | null;
}
```
### Using `DeleteFeedback`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteFeedback, DeleteFeedbackVariables } from '@dataconnect/generated';

// The `DeleteFeedback` mutation requires an argument of type `DeleteFeedbackVariables`:
const deleteFeedbackVars: DeleteFeedbackVariables = {
  id: ..., 
};

// Call the `deleteFeedback()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteFeedback(deleteFeedbackVars);
// Variables can be defined inline as well.
const { data } = await deleteFeedback({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteFeedback(dataConnect, deleteFeedbackVars);

console.log(data.feedback_delete);

// Or, you can use the `Promise` API.
deleteFeedback(deleteFeedbackVars).then((response) => {
  const data = response.data;
  console.log(data.feedback_delete);
});
```

### Using `DeleteFeedback`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteFeedbackRef, DeleteFeedbackVariables } from '@dataconnect/generated';

// The `DeleteFeedback` mutation requires an argument of type `DeleteFeedbackVariables`:
const deleteFeedbackVars: DeleteFeedbackVariables = {
  id: ..., 
};

// Call the `deleteFeedbackRef()` function to get a reference to the mutation.
const ref = deleteFeedbackRef(deleteFeedbackVars);
// Variables can be defined inline as well.
const ref = deleteFeedbackRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteFeedbackRef(dataConnect, deleteFeedbackVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.feedback_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.feedback_delete);
});
```

