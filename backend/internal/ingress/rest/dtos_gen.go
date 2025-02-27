// Package rest provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/deepmap/oapi-codegen/v2 version v2.1.1-0.20240331212514-80f0b978ef16 DO NOT EDIT.
package rest

import (
	"time"
)

const (
	BearerScopes = "bearer.Scopes"
)

// Defines values for CharacterType.
const (
	CharacterTypeNPC CharacterType = "NPC"
	CharacterTypePC  CharacterType = "PC"
)

// Defines values for CreateCharacterType.
const (
	CreateCharacterTypeNPC CreateCharacterType = "NPC"
	CreateCharacterTypePC  CreateCharacterType = "PC"
)

// Aspect defines model for Aspect.
type Aspect struct {
	// Id The unique id of the aspect
	Id string `json:"id"`

	// Name The aspect's name
	Name string `json:"name"`
}

// AuthenticationInfo Information about the current user
type AuthenticationInfo struct {
	// Expires Expiry date of the user's authentication token
	Expires time.Time `json:"expires"`

	// UserId the user's id
	UserId string `json:"userId"`
}

// Character defines model for Character.
type Character struct {
	Aspects []Aspect `json:"aspects"`

	// FatePoints Non-negative number of Fate Points for the character
	FatePoints int `json:"fatePoints"`

	// Id The unique id of the character
	Id string `json:"id"`

	// Name The character's name
	Name string `json:"name"`

	// OwnerId The unique id of the characters's owner
	OwnerId string        `json:"ownerId"`
	Type    CharacterType `json:"type"`
}

// CharacterType defines model for Character.Type.
type CharacterType string

// CreateAspect defines model for CreateAspect.
type CreateAspect struct {
	// Name The aspect's name
	Name string `json:"name"`
}

// CreateCharacter defines model for CreateCharacter.
type CreateCharacter struct {
	// Name The character's name
	Name string              `json:"name"`
	Type CreateCharacterType `json:"type"`
}

// CreateCharacterType defines model for CreateCharacter.Type.
type CreateCharacterType string

// CreateSession defines model for CreateSession.
type CreateSession struct {
	// Title Human readable title of the session
	Title string `json:"title"`
}

// JoinSession defines model for JoinSession.
type JoinSession struct {
	// Name Name of the character joining the session
	Name string `json:"name"`
}

// ProblemDetails A problem details representation as defined in [RFC9457](https://www.rfc-editor.org/rfc/rfc9457)
type ProblemDetails struct {
	// Detail Additional details description
	Detail *string `json:"detail,omitempty"`

	// Errors Additional error details
	Errors *[]string `json:"errors,omitempty"`

	// Instance Identifier of the instance that caused this problem
	Instance *string `json:"instance,omitempty"`

	// Status Status code
	Status *int `json:"status,omitempty"`

	// Title Human readable title - must be given
	Title string `json:"title"`

	// Type Type discriminator
	Type string `json:"type"`
}

// Session defines model for Session.
type Session struct {
	Aspects    []Aspect    `json:"aspects"`
	Characters []Character `json:"characters"`

	// Id The unique id of the session
	Id string `json:"id"`

	// OwnerId The unique id of the session's owner
	OwnerId string `json:"ownerId"`

	// Title Human readable title of the session
	Title string `json:"title"`
}

// UpdateFatePoints defines model for UpdateFatePoints.
type UpdateFatePoints struct {
	// FatePointsDelta Number to modify character's Fate Points (negative or positive)
	FatePointsDelta int `json:"fatePointsDelta"`
}

// VersionInfo defines model for VersionInfo.
type VersionInfo struct {
	// ApiVersion The version string of the API specs.
	ApiVersion string `json:"apiVersion"`

	// Commit Git commit hash of the backend code.
	Commit string `json:"commit"`

	// Version The version string of the backend component.
	Version string `json:"version"`
}

// CreateSessionJSONRequestBody defines body for CreateSession for application/json ContentType.
type CreateSessionJSONRequestBody = CreateSession

// CreateAspectJSONRequestBody defines body for CreateAspect for application/json ContentType.
type CreateAspectJSONRequestBody = CreateAspect

// CreateCharacterAspectJSONRequestBody defines body for CreateCharacterAspect for application/json ContentType.
type CreateCharacterAspectJSONRequestBody = CreateAspect

// UpdateFatePointsJSONRequestBody defines body for UpdateFatePoints for application/json ContentType.
type UpdateFatePointsJSONRequestBody = UpdateFatePoints

// JoinSessionJSONRequestBody defines body for JoinSession for application/json ContentType.
type JoinSessionJSONRequestBody = JoinSession
