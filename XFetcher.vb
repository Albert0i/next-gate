''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
' ██╗░░██╗███████╗███████╗████████╗░█████╗░██╗░░██╗███████╗██████╗░░░░██╗░░░██╗██████╗░'
' ╚██╗██╔╝██╔════╝██╔════╝╚══██╔══╝██╔══██╗██║░░██║██╔════╝██╔══██╗░░░██║░░░██║██╔══██╗'
' ░╚███╔╝░█████╗░░█████╗░░░░░██║░░░██║░░╚═╝███████║█████╗░░██████╔╝░░░╚██╗░██╔╝██████╦╝'
' ░██╔██╗░██╔══╝░░██╔══╝░░░░░██║░░░██║░░██╗██╔══██║██╔══╝░░██╔══██╗░░░░╚████╔╝░██╔══██╗'
' ██╔╝╚██╗██║░░░░░███████╗░░░██║░░░╚█████╔╝██║░░██║███████╗██║░░██║██╗░░╚██╔╝░░██████╦╝'
' ╚═╝░░╚═╝╚═╝░░░░░╚══════╝░░░╚═╝░░░░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝╚═╝░░░╚═╝░░░╚═════╝░'
'                                                                                      '
' XFetcher.vb - SQL generation utility for Oracle (experimental)                       '
'               using ASP.NET 2.0                                                      '
' Version 0.1.2                                                                        '
' Written by Alberto on 2022/04/06                                                     '
'                                                                                      '
' This library is free software; you can redistribute it and/or modify it              '
' under the terms of the GNU Lesser General Public License as published by             '
' the Free Software Foundation; either version 2 of the License, or (at your           '
' option) any later version.                                                           '
'                                                                                      '
' This library is distributed in the hope that it will be useful, but WITHOUT          '
' ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or                '
' FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public                 '
' License for more details.                                                            '
'                                                                                      '
'                                                                                      '
' Text Art                                                                             '
' https://fsymbols.com/text-art/                                                       '
''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Imports Microsoft.VisualBasic
Imports Oracle.DataAccess.Client
Imports System.Data

Public Class XFetcher
    Private Const MAX_FIELDS As Integer = 1000
    Private Const SKIP_PATTERN As String = "ogg_"

    Private _connOra As OracleConnection
    Private _cmdOra As OracleCommand
    Private _drOra As OracleDataReader

    Private _fieldCount As Integer
    Private _fieldName(MAX_FIELDS) As String
    Private _fieldType(MAX_FIELDS) As String

    Public message As String

    ' Visual Basic Constructors
    ' https://www.tutlane.com/tutorial/visual-basic/vb-constructors
    Public Sub New(ByVal conn As OracleConnection)
        Try
            _connOra = conn
            _connOra.Open()
            _cmdOra = _connOra.CreateCommand()
            message = "Hostname: " & _connOra.HostName & ", " & _
                      "Server version: " & _connOra.ServerVersion & ", " & _
                      "Service name: " & _connOra.ServiceName
        Catch ex As OracleException
            message = ">An error has occurred while opening connection... (XFetch.New)<br />"
            message = message & ">" + ex.Message + "<br />"
            message = message & ">" + ex.Source + "<br />"
        End Try
    End Sub

    ' DVisual Basic Destructor
    ' https://www.tutlane.com/tutorial/visual-basic/vb-destructor
    Protected Overrides Sub Finalize()
        _connOra.Close()
        _cmdOra.Dispose()
        _connOra.Dispose()
    End Sub

    ''' <summary>
    ''' Fetch
    ''' </summary>
    ''' <param name="fileName"></param>
    ''' <param name="whereClause"></param>
    ''' <param name="withDelete"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Function Fetch(ByVal fileName As String, _
                 Optional ByVal whereClause As String = "", _
                 Optional ByVal withDelete As Boolean = True) As Boolean
        Dim names As String = ""
        Dim values As String = ""
        Dim stmts As String = ""
        Dim ret As Boolean = True

        _cmdOra.CommandText = String.Format("select * from {0}", fileName) & IIf(whereClause <> "", " where " & whereClause, "")
        Try
            _drOra = _cmdOra.ExecuteReader()

            ' Schema 
            _fieldCount = 0
            For Each r As DataRow In _drOra.GetSchemaTable.Rows()
                _fieldName(_fieldCount) = r("ColumnName").ToString().ToLower()
                _fieldType(_fieldCount) = r("DataType").ToString()

                ' Begin fix (2022/04/06) - Skip fields starts with SKIP_PATTERN.
                If r("ColumnName").ToString().ToLower().StartsWith(SKIP_PATTERN) Then
                    ' Ignore 
                Else
                    If names <> "" Then
                        names = names & ", "
                    End If
                    names = names & r("ColumnName").ToString().ToLower()
                    _fieldCount = _fieldCount + 1
                End If
                ' End fix (2022/04/06)
            Next

            ' Data
            While _drOra.Read()
                values = ""
                For i As Integer = 0 To _fieldCount - 1
                    If values <> "" Then
                        values = values & ", "
                    End If
                    ' Database Extensions for .NET Developer's Guide | A Data Type Conversion
                    ' https://docs.oracle.com/cd/B19306_01/win.102/b14306/appendixa.htm
                    Select Case _fieldType(i)
                        Case "System.Char", "System.String"
                            ' Trim and escape single quote and semi-colon. 
                            values = values & "'" & _drOra.Item(_fieldName(i)).ToString().Trim().Replace("'", "''").Replace(";", ",") & "'"
                        Case "System.Int16", "System.Int32", "System.Int64", _
                             "System.short", "System.int", "System.long", "System.float", _
                             "System.Decimal", "System.Single", "System.Double"
                            values = values & _drOra.Item(_fieldName(i)).ToString().Trim()
                        Case Else
                            values = "null"
                    End Select
                Next
                If stmts <> "" Then
                    stmts = stmts & "; " & vbCrLf
                End If
                ' statement 
                stmts = stmts & String.Format("insert into {0} ({1}) values({2})", fileName, names, values)
            End While

            ' With Delete 
            If stmts <> "" And withDelete = True Then
                stmts = String.Format("delete from {0}", fileName) & IIf(whereClause <> "", " where " & whereClause, "") & "; " & vbCrLf & stmts
            End If
            message = stmts
        Catch ex As OracleException
            message = ">An error has occurred while reading table '" & fileName & "'... (XFetcher.Fetch)<br />"
            message = message & ">" & ex.Message & "<br />"
            message = message & ">" & ex.Source & "<br />"
            message = message & ">SQL statement: " & _cmdOra.CommandText & "<br />"
            ret = False
        End Try

        Return ret
    End Function

    ''' <summary>
    ''' NoSQL - Generate insert statements for MongoDB. (experimental)
    ''' </summary>
    ''' <param name="fileName"></param>
    ''' <param name="whereClause"></param>
    ''' <param name="withDelete"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Function NoSQL(ByVal fileName As String, _
                   Optional ByVal whereClause As String = "", _
                   Optional ByVal withDelete As Boolean = True) As Boolean
        Dim values As String = ""
        Dim stmts As String = ""
        Dim ret As Boolean = True

        _cmdOra.CommandText = String.Format("select * from {0}", fileName) & IIf(whereClause <> "", " where " & whereClause, "")
        Try
            _drOra = _cmdOra.ExecuteReader()

            ' Schema 
            _fieldCount = 0
            For Each r As DataRow In _drOra.GetSchemaTable.Rows()
                _fieldName(_fieldCount) = r("ColumnName").ToString().ToLower()
                _fieldType(_fieldCount) = r("DataType").ToString()
                _fieldCount = _fieldCount + 1
            Next

            ' Data
            While _drOra.Read()
                values = ""
                For i As Integer = 0 To _fieldCount - 1
                    If values <> "" Then
                        values = values & ", "
                    End If

                    values = values & """" & _fieldName(i) & """:"
                    ' Database Extensions for .NET Developer's Guide | A Data Type Conversion
                    ' https://docs.oracle.com/cd/B19306_01/win.102/b14306/appendixa.htm
                    Select Case _fieldType(i)
                        Case "System.Char", "System.String"
                            ' Trim and escape double quote. 
                            values = values & """" & _drOra.Item(_fieldName(i)).ToString().Trim().Replace("""", """""") & """"
                        Case "System.Int16", "System.Int32", "System.Int64", _
                             "System.short", "System.int", "System.long", "System.float", _
                             "System.Decimal", "System.Single", "System.Double"
                            values = values & _drOra.Item(_fieldName(i)).ToString().Trim()
                        Case Else
                            values = "null"
                    End Select
                Next
                If stmts <> "" Then
                    stmts = stmts & "; " & vbCrLf
                End If
                ' statement 
                stmts = stmts & String.Format("db.{0}.insert({{{1}}})", fileName, values)
            End While

            ' With Delete 
            If stmts <> "" And withDelete = True Then
                ' apaplnum='31202000715' --> "apaplnum" : "31202000715"
                ' db.sdapptd.deleteMany({"apaplnum" : "31202000715"})
                stmts = String.Format("db.{0}.deleteMany({{{1}}});", fileName, whereClause.Replace("=", ":").Replace("'", """")) & vbCrLf & stmts
            End If
            message = stmts
        Catch ex As OracleException
            message = ">An error has occurred while reading table '" & fileName & "'... (XFucker.NoSQL)<br />"
            message = message & ">" & ex.Message & "<br />"
            message = message & ">" & ex.Source & "<br />"
            message = message & ">SQL statement: " & _cmdOra.CommandText & "<br />"
            ret = False
        End Try

        Return ret
    End Function
    
End Class

'
' Change log:
' 2022/04/06 - Skip fields starts with SKIP_PATTERN. (version 0.1.2)
' 2020/03/02 - Initial debut. (version 0.1.1)
' 